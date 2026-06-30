from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role, get_current_user
from app.models.order import SalesOrder
from app.models.customer import Customer
from app.models.product import Product

from app.schemas.sales import (
    SalesCreate,
    SalesResponse,
)

router = APIRouter(
    prefix="/sales",
    tags=["Sales"]
)

STAFF_ROLES = ["owner", "admin", "manager", "sales_staff", "accountant"]


# =====================================================
# CUSTOMER PLACE ORDER
# =====================================================

@router.post("/", response_model=SalesResponse)
def place_order(
    sale: SalesCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Customers can only place orders for themselves
    if current_user.get("role") == "customer":
        # Check if the customer record matches the current user
        customer = db.query(Customer).filter(
            Customer.email == current_user.get("sub")
        ).first()
        if not customer or customer.id != sale.customer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only place orders for your own account"
            )
    else:
        # Staff role checking
        if current_user.get("role") not in STAFF_ROLES:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )

    customer = db.query(Customer).filter(
        Customer.id == sale.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    product = db.query(Product).filter(
        Product.id == sale.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    if product.stock < sale.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient Stock"
        )

    total = product.price * sale.quantity

    order = SalesOrder(
        customer_id=sale.customer_id,
        product_id=sale.product_id,
        quantity=sale.quantity,
        unit_price=product.price,
        total_amount=total,
        payment_method=sale.payment_method,

        # Customer has paid
        payment_status="Paid",

        # Waiting for owner approval
        order_status="Pending",
        rejection_reason=None,
        estimated_delivery="2-3 Days"
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    return order


# =====================================================
# CUSTOMER MY ORDERS
# =====================================================

@router.get("/customer/{customer_id}", response_model=list[SalesResponse])
def customer_orders(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user.get("role") == "customer":
        customer = db.query(Customer).filter(
            Customer.email == current_user.get("sub")
        ).first()
        if not customer or customer.id != customer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only view your own orders"
            )
    else:
        if current_user.get("role") not in STAFF_ROLES:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )

    return (
        db.query(SalesOrder)
        .filter(SalesOrder.customer_id == customer_id)
        .order_by(SalesOrder.id.desc())
        .all()
    )


# =====================================================
# OWNER SALES & ORDERS
# =====================================================

@router.get(
    "/owner",
    response_model=list[SalesResponse],
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def owner_orders(
    db: Session = Depends(get_db)
):
    return (
        db.query(SalesOrder)
        .order_by(SalesOrder.id.desc())
        .all()
    )


# =====================================================
# GET SINGLE ORDER
# =====================================================

@router.get("/{order_id}", response_model=SalesResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    order = db.query(SalesOrder).filter(
        SalesOrder.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    if current_user.get("role") == "customer":
        customer = db.query(Customer).filter(
            Customer.email == current_user.get("sub")
        ).first()
        if not customer or customer.id != order.customer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only view your own orders"
            )
    else:
        if current_user.get("role") not in STAFF_ROLES:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )

    return order


# =====================================================
# OWNER APPROVE ORDER
# =====================================================

@router.put(
    "/approve/{order_id}",
    response_model=SalesResponse,
    dependencies=[Depends(require_role("owner", "admin", "manager", "sales_staff"))]
)
def approve_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(SalesOrder).filter(SalesOrder.id == order_id).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    if order.order_status != "Pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order already processed"
        )

    product = db.query(Product).filter(Product.id == order.product_id).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    if product.stock < order.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient Stock"
        )

    # Reduce stock ONLY after approval
    product.stock -= order.quantity
    order.order_status = "Approved"
    order.rejection_reason = None
    order.estimated_delivery = "2-3 Days"

    db.commit()
    db.refresh(order)

    return order


# =====================================================
# OWNER REJECT ORDER
# =====================================================

@router.put(
    "/reject/{order_id}",
    dependencies=[Depends(require_role("owner", "admin", "manager", "sales_staff"))]
)
def reject_order(
    order_id: int,
    reason: str = "",
    db: Session = Depends(get_db)
):
    order = db.query(SalesOrder).filter(
        SalesOrder.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    order.order_status = "Rejected"
    order.rejection_reason = reason
    db.commit()

    return {"message": "Order Rejected"}


# =====================================================
# OUT FOR DELIVERY
# =====================================================

@router.put(
    "/dispatch/{order_id}",
    response_model=SalesResponse,
    dependencies=[Depends(require_role("owner", "admin", "manager", "sales_staff", "inventory_staff"))]
)
def dispatch_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(SalesOrder).filter(
        SalesOrder.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    order.order_status = "Out for Delivery"
    db.commit()
    db.refresh(order)

    return order


# =====================================================
# DELIVERED
# =====================================================

@router.put(
    "/deliver/{order_id}",
    response_model=SalesResponse,
    dependencies=[Depends(require_role("owner", "admin", "manager", "sales_staff"))]
)
def deliver_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(SalesOrder).filter(
        SalesOrder.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    order.order_status = "Delivered"
    db.commit()
    db.refresh(order)

    return order


# =====================================================
# DELETE ORDER
# =====================================================

@router.delete(
    "/{order_id}",
    dependencies=[Depends(require_role("owner", "admin"))]
)
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(SalesOrder).filter(
        SalesOrder.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {"message": "Order Deleted Successfully"}