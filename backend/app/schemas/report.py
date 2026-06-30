from pydantic import BaseModel


class SalesReport(BaseModel):
    total_sales: int
    total_revenue: float


class PurchaseReport(BaseModel):
    total_purchases: int
    total_purchase_amount: float


class InventoryReport(BaseModel):
    total_products: int
    total_stock: int


class BusinessReport(BaseModel):
    total_customers: int
    total_suppliers: int
    total_sales: int
    total_purchases: int
    total_revenue: float
    total_purchase_amount: float