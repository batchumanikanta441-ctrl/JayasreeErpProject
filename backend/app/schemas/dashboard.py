from pydantic import BaseModel


class MonthlySales(BaseModel):
    month: str
    revenue: float
    profit: float


class CategorySales(BaseModel):
    name: str
    value: float


class RecentOrder(BaseModel):
    id: int
    customer: str
    amount: float
    status: str


class DashboardResponse(BaseModel):
    total_products: int
    total_customers: int
    total_suppliers: int
    total_sales: int
    total_purchases: int
    total_revenue: float
    total_purchase_amount: float

    monthly_sales: list[MonthlySales]

    sales_by_category: list[CategorySales]

    recent_orders: list[RecentOrder]