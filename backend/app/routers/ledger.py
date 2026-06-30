from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role, get_current_user

from app.models.ledger import CustomerLedger
from app.models.customer import Customer
from app.models.order import SalesOrder

from app.schemas.ledger import (
    CustomerLedgerCreate,
    CustomerLedgerResponse
)

router = APIRouter(
    prefix="/ledger",
    tags=["Customer Ledger"]
)

STAFF_ROLES = ["owner", "admin", "manager", "accountant"]


@router.post(
    "/",
    response_model=CustomerLedgerResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def create_ledger(
    ledger: CustomerLedgerCreate,
    db: Session = Depends(get_db)
):
    customer = db.query(Customer).filter(
        Customer.id == ledger.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    sale = db.query(SalesOrder).filter(
        SalesOrder.id == ledger.sales_order_id
    ).first()

    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sales order not found"
        )

    previous_balance = (
        db.query(CustomerLedger)
        .filter(CustomerLedger.customer_id == ledger.customer_id)
        .order_by(CustomerLedger.id.desc())
        .first()
    )

    balance = (
        previous_balance.balance if previous_balance else 0
    )

    balance = balance + ledger.debit - ledger.credit

    new_entry = CustomerLedger(
        customer_id=ledger.customer_id,
        sales_order_id=ledger.sales_order_id,
        debit=ledger.debit,
        credit=ledger.credit,
        balance=balance,
        remarks=ledger.remarks
    )

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return new_entry


@router.get(
    "/",
    response_model=list[CustomerLedgerResponse],
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_ledger(
    db: Session = Depends(get_db)
):
    return db.query(CustomerLedger).all()


@router.get("/{customer_id}")
def get_customer_ledger(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # A customer can only query their own ledger
    if current_user.get("role") == "customer":
        customer = db.query(Customer).filter(
            Customer.email == current_user.get("sub")
        ).first()
        if not customer or customer.id != customer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only view your own ledger"
            )
    else:
        if current_user.get("role") not in STAFF_ROLES:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )

    return db.query(CustomerLedger).filter(
        CustomerLedger.customer_id == customer_id
    ).all()