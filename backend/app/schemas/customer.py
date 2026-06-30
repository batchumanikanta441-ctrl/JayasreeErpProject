from pydantic import BaseModel


class CustomerCreate(BaseModel):
    name: str
    phone: str
    email: str
    gst_number: str
    address: str
    credit_limit: float


class CustomerResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    gst_number: str
    address: str
    credit_limit: float
    outstanding_amount: float

    class Config:
        from_attributes = True