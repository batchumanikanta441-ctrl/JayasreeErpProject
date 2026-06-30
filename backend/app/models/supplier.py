from sqlalchemy import Column, Integer, String, Float

from app.core.database import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    phone = Column(String, unique=True)

    email = Column(String)

    gst_number = Column(String)

    address = Column(String)

    material_type = Column(String)

    outstanding_amount = Column(Float, default=0)