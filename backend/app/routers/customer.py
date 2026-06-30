from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role, get_current_user
from app.models.customer import Customer
from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)

STAFF_ROLES = ["owner", "admin", "manager", "sales_staff", "accountant"]


@router.post(
    "/",
    response_model=CustomerResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    new_customer = Customer(
        name=customer.name,
        phone=customer.phone,
        email=customer.email,
        gst_number=customer.gst_number,
        address=customer.address,
        credit_limit=customer.credit_limit
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer


@router.get(
    "/",
    response_model=list[CustomerResponse],
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_customers(
    db: Session = Depends(get_db)
):
    return db.query(Customer).all()


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    # Allow customers to see only their own profile
    if current_user.get("role") == "customer":
        if customer.email != current_user.get("sub"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only view your own profile"
            )
    else:
        if current_user.get("role") not in STAFF_ROLES:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )

    return customer


@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(
    customer_id: int,
    customer: CustomerCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    # Allow customers to update only their own profile
    if current_user.get("role") == "customer":
        if db_customer.email != current_user.get("sub"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only update your own profile"
            )
    else:
        if current_user.get("role") not in STAFF_ROLES:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )

    db_customer.name = customer.name
    db_customer.phone = customer.phone
    db_customer.email = customer.email
    db_customer.gst_number = customer.gst_number
    db_customer.address = customer.address
    db_customer.credit_limit = customer.credit_limit

    db.commit()
    db.refresh(db_customer)

    return db_customer


@router.delete(
    "/{customer_id}",
    dependencies=[Depends(require_role("owner", "admin"))]
)
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    db.delete(customer)
    db.commit()

    return {
        "message": "Customer deleted successfully"
    }