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

from app.schemas.report import (
    SalesReport,
    PurchaseReport,
    InventoryReport,
    BusinessReport
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

# Reports should be owner, admin, or manager only
STAFF_ROLES = ["owner", "admin", "manager", "accountant"]


@router.get(
    "/sales",
    response_model=SalesReport,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def sales_report(
    db: Session = Depends(get_db)
):
    total_sales = db.query(SalesOrder).count()
    total_revenue = (
        db.query(func.sum(SalesOrder.total_amount)).scalar() or 0
    )

    return SalesReport(
        total_sales=total_sales,
        total_revenue=total_revenue
    )


@router.get(
    "/purchases",
    response_model=PurchaseReport,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def purchase_report(
    db: Session = Depends(get_db)
):
    total_purchases = db.query(PurchaseOrder).count()
    total_purchase_amount = (
        db.query(func.sum(PurchaseOrder.total_amount)).scalar() or 0
    )

    return PurchaseReport(
        total_purchases=total_purchases,
        total_purchase_amount=total_purchase_amount
    )


@router.get(
    "/inventory",
    response_model=InventoryReport,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def inventory_report(
    db: Session = Depends(get_db)
):
    total_products = db.query(Product).count()
    total_stock = (
        db.query(func.sum(Product.stock)).scalar() or 0
    )

    return InventoryReport(
        total_products=total_products,
        total_stock=total_stock
    )


@router.get(
    "/business",
    response_model=BusinessReport,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def business_report(
    db: Session = Depends(get_db)
):
    return BusinessReport(
        total_customers=db.query(Customer).count(),
        total_suppliers=db.query(Supplier).count(),
        total_sales=db.query(SalesOrder).count(),
        total_purchases=db.query(PurchaseOrder).count(),
        total_revenue=db.query(func.sum(SalesOrder.total_amount)).scalar() or 0,
        total_purchase_amount=db.query(func.sum(PurchaseOrder.total_amount)).scalar() or 0
    )