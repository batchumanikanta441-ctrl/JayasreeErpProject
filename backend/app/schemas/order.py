from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SalesOrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int
    unit_price: float
    payment_method: str


class SalesOrderUpdate(BaseModel):
    order_status: str
    rejection_reason: Optional[str] = None


class SalesOrderResponse(BaseModel):
    id: int

    customer_id: int
    product_id: int

    quantity: int

    unit_price: float

    total_amount: float

    payment_method: str

    payment_status: str

    order_status: str

    rejection_reason: Optional[str]

    estimated_delivery: str

    created_at: datetime

    updated_at: Optional[datetime]

    class Config:
        from_attributes = True