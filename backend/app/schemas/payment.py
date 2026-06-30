from pydantic import BaseModel


class PaymentCreate(BaseModel):
    sales_order_id: int
    payment_method: str


class PaymentResponse(BaseModel):
    id: int
    sales_order_id: int
    amount: float
    payment_method: str
    payment_status: str
    transaction_id: str | None = None

    class Config:
        from_attributes = True