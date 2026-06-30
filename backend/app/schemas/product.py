from typing import Optional

from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    category: str

    brand: Optional[str] = None
    description: Optional[str] = None

    price: float
    mrp: Optional[float] = 0

    stock: int
    unit: str

    image: Optional[str] = None

    rating: Optional[float] = 5
    review_count: Optional[int] = 0
    min_order_qty: Optional[int] = 1

    slug: Optional[str] = None


class ProductResponse(BaseModel):
    id: int

    name: str
    category: str

    brand: Optional[str] = None
    description: Optional[str] = None

    price: float
    mrp: Optional[float] = 0

    stock: int
    unit: str

    image: Optional[str] = None

    rating: Optional[float] = 5
    review_count: Optional[int] = 0
    min_order_qty: Optional[int] = 1

    slug: Optional[str] = None

    class Config:
        from_attributes = True