from pydantic import BaseModel


class PurchaseCreate(BaseModel):
    supplier_id: int
    product_id: int
    quantity: int


class PurchaseResponse(BaseModel):
    id: int
    supplier_id: int
    product_id: int
    quantity: int
    unit_price: float
    total_amount: float
    payment_status: str
    purchase_status: str

    class Config:
        from_attributes = True