from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine


from app.models.user import User
from app.models.product import Product
from app.models.inventory import InventoryTransaction
from app.models.customer import Customer
from app.models.supplier import Supplier
from app.models.order import SalesOrder
from app.models.purchase import PurchaseOrder
from app.models.payment import Payment
from app.models.invoice import Invoice
from app.models.role import Role
from app.models.ledger import CustomerLedger
from app.models.supplier_ledger import SupplierLedger

from app.routers.supplier_ledger import router as supplier_ledger_router
from app.routers.ledger import router as ledger_router
from app.routers.role import router as role_router
from app.routers.invoice import router as invoice_router
from app.routers.payment import router as payment_router
from app.routers.purchase import router as purchase_router
from app.routers.auth import router as auth_router
from app.routers.products import router as product_router
from app.routers.inventory import router as inventory_router
from app.routers.customer import router as customer_router
from app.routers.supplier import router as supplier_router
from app.routers.sales import router as sales_router
from app.routers.dashboard import router as dashboard_router
from app.routers.report import router as report_router
from app.routers.profit_loss import router as profit_loss_router
from app.routers.stock_alert import router as stock_alert_router
from app.routers.pdf import router as pdf_router
from app.routers.ai import router as ai_router
from app.routers.analytics import router as analytics_router
from app.routers import customer_dashboard




Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Jayasree ERP AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://batchumanikanta441-ctrl.github.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(product_router)
app.include_router(inventory_router)
app.include_router(customer_router)
app.include_router(supplier_router)
app.include_router(sales_router)
app.include_router(purchase_router)
app.include_router(payment_router)
app.include_router(invoice_router)
app.include_router(dashboard_router)
app.include_router(report_router)
app.include_router(role_router)
app.include_router(ledger_router)
app.include_router(supplier_ledger_router)
app.include_router(profit_loss_router)
app.include_router(stock_alert_router)
app.include_router(pdf_router)
app.include_router(ai_router)
app.include_router(analytics_router)
app.include_router(customer_dashboard.router)

@app.get("/")
def root():
    return {
        "status": "running",
        "app": "Jayasree ERP AI"
    }