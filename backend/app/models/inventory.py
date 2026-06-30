from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(
        Integer,
        ForeignKey("products.id")
    )

    transaction_type = Column(String)

    quantity = Column(Integer)

    remarks = Column(String)