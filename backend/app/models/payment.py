from sqlalchemy import Column, Integer, Float, String, ForeignKey

from app.core.database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    sales_order_id = Column(
        Integer,
        ForeignKey("sales_orders.id"),
        nullable=False
    )

    amount = Column(Float, nullable=False)

    payment_method = Column(String)

    payment_status = Column(
        String,
        default="Pending"
    )

    transaction_id = Column(
        String,
        nullable=True
    )