from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role, get_current_user

from app.models.invoice import Invoice
from app.models.order import SalesOrder
from app.models.customer import Customer

from app.schemas.invoice import (
    InvoiceCreate,
    InvoiceResponse
)

router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"]
)

STAFF_ROLES = ["owner", "admin", "manager", "accountant"]


@router.post(
    "/",
    response_model=InvoiceResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def create_invoice(
    invoice: InvoiceCreate,
    db: Session = Depends(get_db)
):
    sale = db.query(SalesOrder).filter(
        SalesOrder.id == invoice.sales_order_id
    ).first()

    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sales order not found"
        )

    customer = db.query(Customer).filter(
        Customer.id == sale.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    new_invoice = Invoice(
        sales_order_id=sale.id,
        invoice_number=f"INV{sale.id:05d}",
        customer_name=customer.name,
        total_amount=sale.total_amount,
        payment_status=sale.payment_status,
        invoice_status="Generated"
    )

    db.add(new_invoice)
    db.commit()
    db.refresh(new_invoice)

    return new_invoice


@router.get("/", response_model=list[InvoiceResponse])
def get_invoices(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Customer user can only see invoices linked to their own email
    if current_user.get("role") == "customer":
        customer = db.query(Customer).filter(
            Customer.email == current_user.get("sub")
        ).first()
        if not customer:
            return []
        
        # Join to get customer invoices
        return db.query(Invoice).join(
            SalesOrder, Invoice.sales_order_id == SalesOrder.id
        ).filter(
            SalesOrder.customer_id == customer.id
        ).all()

    # Staff can see all invoices
    if current_user.get("role") not in STAFF_ROLES:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )

    return db.query(Invoice).all()