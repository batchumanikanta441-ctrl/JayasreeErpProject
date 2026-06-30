from sqlalchemy import Column, Integer, Float, String, ForeignKey

from app.core.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)

    sales_order_id = Column(
        Integer,
        ForeignKey("sales_orders.id"),
        nullable=False
    )

    invoice_number = Column(
        String,
        unique=True,
        nullable=False
    )

    customer_name = Column(String)

    total_amount = Column(Float)

    payment_status = Column(String)

    invoice_status = Column(
        String,
        default="Generated"
    )