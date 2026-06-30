from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from datetime import datetime

from app.core.database import Base


class CustomerLedger(Base):
    __tablename__ = "customer_ledger"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    sales_order_id = Column(
        Integer,
        ForeignKey("sales_orders.id"),
        nullable=False
    )

    debit = Column(Float, default=0)

    credit = Column(Float, default=0)

    balance = Column(Float, default=0)

    remarks = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )