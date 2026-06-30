from pydantic import BaseModel


class InvoiceCreate(BaseModel):
    sales_order_id: int


class InvoiceResponse(BaseModel):
    id: int
    sales_order_id: int
    invoice_number: str
    customer_name: str
    total_amount: float
    payment_status: str
    invoice_status: str

    class Config:
        from_attributes = True