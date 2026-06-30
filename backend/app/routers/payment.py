from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role, get_current_user

from app.models.payment import Payment
from app.models.order import SalesOrder
from app.models.customer import Customer

from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

STAFF_ROLES = ["owner", "admin", "manager", "accountant"]


@router.post("/", response_model=PaymentResponse)
def create_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    sale = db.query(SalesOrder).filter(
        SalesOrder.id == payment.sales_order_id
    ).first()

    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sales order not found"
        )

    # If customer, confirm it's their sales order
    if current_user.get("role") == "customer":
        customer = db.query(Customer).filter(
            Customer.email == current_user.get("sub")
        ).first()
        if not customer or customer.id != sale.customer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only record payments for your own orders"
            )
    else:
        if current_user.get("role") not in STAFF_ROLES:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )

    new_payment = Payment(
        sales_order_id=sale.id,
        amount=sale.total_amount,
        payment_method=payment.payment_method,
        payment_status="Paid",
        transaction_id=f"TXN{sale.id}001"
    )

    sale.payment_status = "Paid"

    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)

    return new_payment


@router.get("/", response_model=list[PaymentResponse])
def get_payments(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Only staff can query all payments. Customers can only see payments for their own orders (filtered at order endpoint).
    if current_user.get("role") not in STAFF_ROLES:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )

    return db.query(Payment).all()