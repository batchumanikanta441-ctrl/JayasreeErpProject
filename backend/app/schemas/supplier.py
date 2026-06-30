from pydantic import BaseModel


class SupplierCreate(BaseModel):
    name: str
    phone: str
    email: str
    gst_number: str
    address: str
    material_type: str


class SupplierResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    gst_number: str
    address: str
    material_type: str
    outstanding_amount: float

    class Config:
        from_attributes = True