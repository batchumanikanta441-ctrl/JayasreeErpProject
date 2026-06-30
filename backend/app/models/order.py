from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    ForeignKey,
    DateTime,
)
from sqlalchemy.sql import func

from app.core.database import Base


class SalesOrder(Base):
    __tablename__ = "sales_orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False
    )

    quantity = Column(Integer, nullable=False)

    unit_price = Column(Float, nullable=False)

    total_amount = Column(Float, nullable=False)

    payment_method = Column(
        String,
        nullable=False
    )

    payment_status = Column(
        String,
        default="Pending"
    )

    # Pending
    # Approved
    # Rejected
    # Out for Delivery
    # Delivered
    order_status = Column(
        String,
        default="Pending"
    )

    # Optional rejection reason
    rejection_reason = Column(
        String,
        nullable=True
    )

    estimated_delivery = Column(
        String,
        default="2-3 Days"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now(),
        server_default=func.now()
    )