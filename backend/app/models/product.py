from sqlalchemy import Column, Integer, String, Float, Text

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    category = Column(String)

    price = Column(Float, default=0)

    mrp = Column(Float, default=0)

    stock = Column(Integer, default=0)

    unit = Column(String, default="Nos")

    brand = Column(String)

    description = Column(Text)

    image = Column(String)

    rating = Column(Float, default=5)

    review_count = Column(Integer, default=0)

    min_order_qty = Column(Integer, default=1)

    slug = Column(String, unique=True)