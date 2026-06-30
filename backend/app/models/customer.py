from sqlalchemy import Column, Integer, String, Float

from app.core.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    phone = Column(String, unique=True)

    email = Column(String)

    gst_number = Column(String)

    address = Column(String)

    credit_limit = Column(Float, default=0)

    outstanding_amount = Column(Float, default=0)