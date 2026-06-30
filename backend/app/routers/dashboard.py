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

from app.schemas.dashboard import (
    DashboardResponse,
    MonthlySales,
    CategorySales,
    RecentOrder,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

STAFF_ROLES = ["owner", "admin", "manager", "sales_staff", "inventory_staff", "accountant"]


@router.get(
    "/",
    response_model=DashboardResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_dashboard(
    db: Session = Depends(get_db)
):
    total_products = db.query(Product).count()
    total_customers = db.query(Customer).count()
    total_suppliers = db.query(Supplier).count()
    total_sales = db.query(SalesOrder).count()
    total_purchases = db.query(PurchaseOrder).count()

    total_revenue = (
        db.query(func.sum(SalesOrder.total_amount)).scalar() or 0
    )

    total_purchase_amount = (
        db.query(func.sum(PurchaseOrder.total_amount)).scalar() or 0
    )

    monthly_sales = [
        MonthlySales(
            month="This Month",
            revenue=total_revenue,
            profit=total_revenue - total_purchase_amount,
        )
    ]

    sales_by_category = [
        CategorySales(
            name="Products",
            value=total_products,
        ),
        CategorySales(
            name="Sales",
            value=total_sales,
        ),
        CategorySales(
            name="Purchases",
            value=total_purchases,
        ),
    ]

    recent_orders = []
    orders = (
        db.query(SalesOrder)
        .order_by(SalesOrder.id.desc())
        .limit(5)
        .all()
    )

    for order in orders:
        recent_orders.append(
            RecentOrder(
                id=order.id,
                customer=f"Customer {order.customer_id}",
                amount=order.total_amount,
                status=order.order_status,
            )
        )

    return DashboardResponse(
        total_products=total_products,
        total_customers=total_customers,
        total_suppliers=total_suppliers,
        total_sales=total_sales,
        total_purchases=total_purchases,
        total_revenue=total_revenue,
        total_purchase_amount=total_purchase_amount,
        monthly_sales=monthly_sales,
        sales_by_category=sales_by_category,
        recent_orders=recent_orders,
    )