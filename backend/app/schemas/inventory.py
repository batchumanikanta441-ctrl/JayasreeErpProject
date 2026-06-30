from pydantic import BaseModel


class StockTransaction(BaseModel):
    product_id: int
    quantity: int
    remarks: str = ""


class InventoryResponse(BaseModel):
    id: int
    product_id: int
    transaction_type: str
    quantity: int
    remarks: str

    class Config:
        from_attributes = True