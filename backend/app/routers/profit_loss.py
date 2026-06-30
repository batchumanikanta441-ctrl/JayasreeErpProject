from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db

from app.models.order import SalesOrder
from app.models.purchase import PurchaseOrder

from app.schemas.profit_loss import ProfitLossResponse

router = APIRouter(
    prefix="/profit-loss",
    tags=["Profit & Loss"]
)


@router.get("/", response_model=ProfitLossResponse)
def get_profit_loss(
    db: Session = Depends(get_db)
):

    total_sales = (
        db.query(func.sum(SalesOrder.total_amount)).scalar() or 0
    )

    total_purchases = (
        db.query(func.sum(PurchaseOrder.total_amount)).scalar() or 0
    )

    net_profit = total_sales - total_purchases

    gross_profit = net_profit if net_profit > 0 else 0

    gross_loss = abs(net_profit) if net_profit < 0 else 0

    return ProfitLossResponse(
        total_sales=total_sales,
        total_purchases=total_purchases,
        gross_profit=gross_profit,
        gross_loss=gross_loss,
        net_profit=net_profit
    )