from pydantic import BaseModel


class StockAlertResponse(BaseModel):
    product_id: int
    product_name: str
    current_stock: int
    minimum_stock: int
    alert: str