from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role

from app.models.user import User
from app.models.customer import Customer
from app.models.order import SalesOrder

router = APIRouter(
    prefix="/customer/dashboard",
    tags=["Customer Dashboard"]
)


@router.get(
    "/",
    dependencies=[Depends(require_role("customer"))]
)
def customer_dashboard(
    db: Session = Depends(get_db),
):
    total_orders = db.query(SalesOrder).count()
    total_customers = db.query(Customer).count()

    return {
        "message": "Customer Dashboard",
        "total_orders": total_orders,
        "total_customers": total_customers
    }