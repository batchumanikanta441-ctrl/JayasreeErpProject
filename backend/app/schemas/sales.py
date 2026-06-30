from pydantic import BaseModel


class SalesCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int
    payment_method: str


class SalesResponse(BaseModel):
    id: int
    customer_id: int
    product_id: int
    quantity: int
    unit_price: float
    total_amount: float
    payment_method: str
    payment_status: str
    order_status: str

    class Config:
        from_attributes = True