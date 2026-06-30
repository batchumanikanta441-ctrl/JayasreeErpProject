from pydantic import BaseModel


class ProfitLossResponse(BaseModel):
    total_sales: float
    total_purchases: float
    gross_profit: float
    gross_loss: float
    net_profit: float