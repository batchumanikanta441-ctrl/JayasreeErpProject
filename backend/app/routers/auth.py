from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.config import settings
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

from app.models.user import User
from app.models.role import Role
from app.models.customer import Customer

from sqlalchemy import or_

from app.services.auth_service import (
    generate_otp,
    get_otp_expiry,
    verify_otp,
)

from app.services.email_service import send_otp_email

from app.schemas.user import (
    SendOTPRequest,
    VerifyOTPRequest,
    UserCreate,
    UserResponse,
    UserLogin,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =====================================================
# REGISTER
# =====================================================

@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    # Check if email already exists
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Check if phone already exists
    existing_phone = db.query(User).filter(
        User.phone == user.phone
    ).first()

    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered"
        )

    # Assign default customer role
    role_id = user.role_id
    if role_id is None:
        customer_role = db.query(Role).filter(
            Role.name == "Customer"
        ).first()
        if customer_role:
            role_id = customer_role.id

    hashed = hash_password(user.password)

    # Create user and customer in single transaction
    try:
        new_user = User(
            name=user.name,
            email=user.email,
            phone=user.phone,
            password_hash=hashed,
            role_id=role_id,
            role="customer",
        )
        db.add(new_user)
        db.flush()

        customer = Customer(
            name=new_user.name,
            phone=new_user.phone,
            email=new_user.email,
            gst_number="",
            address="",
            credit_limit=0
        )
        db.add(customer)
        db.commit()
        db.refresh(new_user)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed. Please try again."
        )

    return new_user


# =====================================================
# CUSTOMER SEND OTP
# =====================================================

@router.post("/customer/send-otp")
def customer_send_otp(
    request: SendOTPRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        or_(
            User.email == request.login,
            User.phone == request.login
        )
    ).first()

    # If customer does not exist, CREATE/REGISTER them automatically
    if not user:
        try:
            # Generate temporary password for auto-created user
            temp_password = hash_password("Password123")
            
            # Find or create customer role
            role_id = None
            customer_role = db.query(Role).filter(Role.name == "Customer").first()
            if customer_role:
                role_id = customer_role.id
            else:
                new_role = Role(name="Customer", description="Default Customer Role")
                db.add(new_role)
                db.flush()
                role_id = new_role.id

            is_email = "@" in request.login
            email_val = request.login if is_email else f"{request.login}@example.com"
            phone_val = request.login if not is_email else request.login.split("@")[0]
            # Strip non-digits from phone if needed, make sure it has dummy format
            if len(phone_val) > 15:
                phone_val = phone_val[:15]

            user = User(
                name=request.login.split("@")[0].capitalize(),
                email=email_val,
                phone=phone_val,
                password_hash=temp_password,
                role_id=role_id,
                role="customer",
                email_verified=False,
                phone_verified=False
            )
            db.add(user)
            db.flush()

            customer = Customer(
                name=user.name,
                phone=user.phone,
                email=user.email,
                gst_number="",
                address="",
                credit_limit=100000.0  # Give default credit limit of 1L
            )
            db.add(customer)
            db.commit()
            db.refresh(user)
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Auto-registration failed: {str(e)}"
            )

    otp = generate_otp()

    user.otp = otp
    user.otp_expiry = get_otp_expiry()
    db.commit()

    send_otp_email(user.email, otp)

    return {"message": "OTP sent successfully"}


# =====================================================
# CUSTOMER VERIFY OTP
# =====================================================

@router.post("/customer/verify-otp")
def customer_verify_otp(
    request: VerifyOTPRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        or_(
            User.email == request.login,
            User.phone == request.login
        )
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not verify_otp(user.otp, request.otp, user.otp_expiry):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or Expired OTP"
        )

    # Clear OTP after successful verification
    user.email_verified = True
    user.phone_verified = True
    user.otp = None
    user.otp_expiry = None
    db.commit()

    token = create_access_token({
        "sub": user.email,
        "user_id": user.id,
        "role_id": user.role_id,
        "role": user.role or "customer",
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role or "customer",
    }


# =====================================================
# OWNER SEND OTP
# =====================================================

@router.post("/send-otp")
def send_otp(
    request: SendOTPRequest,
    db: Session = Depends(get_db)
):
    owner_email = settings.OWNER_EMAIL or "manib143218@gmail.com"
    owner_phone = settings.OWNER_PHONE or "9100277157"

    if request.login not in [owner_email, owner_phone]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Owner can login here"
        )

    user = db.query(User).filter(
        User.email == owner_email
    ).first()

    # If owner user doesn't exist, create it automatically
    if not user:
        try:
            # Find or create Owner role
            role_id = None
            owner_role = db.query(Role).filter(Role.name == "Owner").first()
            if owner_role:
                role_id = owner_role.id
            else:
                new_role = Role(name="Owner", description="Owner Role")
                db.add(new_role)
                db.flush()
                role_id = new_role.id

            user = User(
                name="Owner",
                email=owner_email,
                phone=owner_phone,
                password_hash=hash_password("OwnerPassword123"),
                role_id=role_id,
                role="owner",
                email_verified=True,
                phone_verified=True
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Auto owner creation failed: {str(e)}"
            )

    otp = generate_otp()

    user.otp = otp
    user.otp_expiry = get_otp_expiry()
    db.commit()

    send_otp_email(user.email, otp)

    return {"message": "OTP sent successfully"}


# =====================================================
# OWNER VERIFY OTP
# =====================================================

@router.post("/verify-otp")
def verify_login_otp(
    request: VerifyOTPRequest,
    db: Session = Depends(get_db)
):
    owner_email = settings.OWNER_EMAIL or "manib143218@gmail.com"

    user = db.query(User).filter(
        User.email == owner_email
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not verify_otp(user.otp, request.otp, user.otp_expiry):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or Expired OTP"
        )

    user.otp = None
    user.otp_expiry = None
    db.commit()

    token = create_access_token({
        "sub": user.email,
        "user_id": user.id,
        "role_id": user.role_id,
        "role": user.role or "owner",
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role or "owner",
    }


# =====================================================
# PASSWORD LOGIN
# =====================================================

@router.post("/login")
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(
        User.email == credentials.email
    ).first()

    # If the user doesn't exist, let's create it automatically instead of rejecting
    if not db_user:
        try:
            # Auto-register as Customer
            role_id = None
            customer_role = db.query(Role).filter(Role.name == "Customer").first()
            if customer_role:
                role_id = customer_role.id
            else:
                new_role = Role(name="Customer", description="Default Customer Role")
                db.add(new_role)
                db.flush()
                role_id = new_role.id

            hashed = hash_password(credentials.password)
            db_user = User(
                name=credentials.email.split("@")[0].capitalize(),
                email=credentials.email,
                phone="dummy_" + credentials.email.split("@")[0],
                password_hash=hashed,
                role_id=role_id,
                role="customer",
                email_verified=True
            )
            db.add(db_user)
            db.flush()

            customer = Customer(
                name=db_user.name,
                phone=db_user.phone,
                email=db_user.email,
                gst_number="",
                address="",
                credit_limit=100000.0
            )
            db.add(customer)
            db.commit()
            db.refresh(db_user)
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Auto-registration during login failed: {str(e)}"
            )
    else:
        # Check password
        if not verify_password(credentials.password, db_user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

    token = create_access_token({
        "sub": db_user.email,
        "user_id": db_user.id,
        "role_id": db_user.role_id,
        "role": db_user.role or "customer",
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email,
        "phone": db_user.phone,
        "role": db_user.role or "customer",
    }


# =====================================================
# GET CURRENT USER (authenticated)
# =====================================================

@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
