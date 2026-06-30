from pydantic import BaseModel


class SupplierLedgerCreate(BaseModel):
    supplier_id: int
    purchase_order_id: int
    debit: float
    credit: float
    remarks: str


class SupplierLedgerResponse(BaseModel):
    id: int
    supplier_id: int
    purchase_order_id: int
    debit: float
    credit: float
    balance: float
    remarks: str

    class Config:
        from_attributes = True