from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.core.security import require_role

from app.models.product import Product
from app.models.customer import Customer
from app.models.supplier import Supplier
from app.models.order import SalesOrder
from app.models.purchase import PurchaseOrder

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

STAFF_ROLES = ["owner", "admin", "manager", "sales_staff", "inventory_staff", "accountant"]


@router.get(
    "/",
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_analytics(
    db: Session = Depends(get_db)
):
    total_products = db.query(Product).count()
    total_customers = db.query(Customer).count()
    total_suppliers = db.query(Supplier).count()
    total_sales = db.query(SalesOrder).count()
    total_purchases = db.query(PurchaseOrder).count()

    total_revenue = (
        db.query(func.sum(SalesOrder.total_amount))
        .scalar()
        or 0
    )

    total_purchase_amount = (
        db.query(func.sum(PurchaseOrder.total_amount))
        .scalar()
        or 0
    )

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_suppliers": total_suppliers,
        "total_sales": total_sales,
        "total_purchases": total_purchases,
        "total_revenue": total_revenue,
        "total_purchase_amount": total_purchase_amount
    }