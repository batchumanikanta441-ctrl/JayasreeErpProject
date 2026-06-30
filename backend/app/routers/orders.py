from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.order import SalesOrder
from app.models.customer import Customer
from app.schemas.sales import SalesCreate, SalesResponse

router = APIRouter(
    prefix="/sales",
    tags=["Sales"]
)


@router.post("/", response_model=SalesResponse)
def create_sale(
    sale: SalesCreate,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == sale.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    new_sale = SalesOrder(
        customer_id=sale.customer_id,
        total_amount=0,
        payment_method=sale.payment_method,
        payment_status="Pending",
        order_status="Pending"
    )

    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)

    return new_sale


@router.get("/", response_model=list[SalesResponse])
def get_sales(
    db: Session = Depends(get_db)
):
    return db.query(SalesOrder).all()