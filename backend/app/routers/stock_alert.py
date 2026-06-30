from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.product import Product
from app.schemas.stock_alert import StockAlertResponse

router = APIRouter(
    prefix="/stock-alert",
    tags=["Stock Alerts"]
)

MINIMUM_STOCK = 20


@router.get("/", response_model=list[StockAlertResponse])
def get_low_stock_products(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    alerts = []

    for product in products:

        if product.stock <= MINIMUM_STOCK:

            alerts.append(
                StockAlertResponse(
                    product_id=product.id,
                    product_name=product.name,
                    current_stock=product.stock,
                    minimum_stock=MINIMUM_STOCK,
                    alert="Low Stock"
                )
            )

    return alerts