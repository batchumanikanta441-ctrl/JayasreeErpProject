from pydantic import BaseModel


class CustomerLedgerCreate(BaseModel):
    customer_id: int
    sales_order_id: int
    debit: float
    credit: float
    remarks: str


class CustomerLedgerResponse(BaseModel):
    id: int
    customer_id: int
    sales_order_id: int
    debit: float
    credit: float
    balance: float
    remarks: str

    class Config:
        from_attributes = True