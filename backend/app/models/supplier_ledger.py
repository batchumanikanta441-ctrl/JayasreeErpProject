from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from datetime import datetime

from app.core.database import Base


class SupplierLedger(Base):
    __tablename__ = "supplier_ledger"

    id = Column(Integer, primary_key=True, index=True)

    supplier_id = Column(
        Integer,
        ForeignKey("suppliers.id"),
        nullable=False
    )

    purchase_order_id = Column(
        Integer,
        ForeignKey("purchase_orders.id"),
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