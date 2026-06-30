from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.product import Product
from app.models.customer import Customer
from app.models.supplier import Supplier
from app.models.order import SalesOrder
from app.models.purchase import PurchaseOrder


def get_business_summary(db: Session):

    products = db.query(Product).all()
    customers = db.query(Customer).all()
    suppliers = db.query(Supplier).all()
    sales = db.query(SalesOrder).all()
    purchases = db.query(PurchaseOrder).all()

    total_revenue = (
        db.query(func.sum(SalesOrder.total_amount)).scalar() or 0
    )

    total_purchase_amount = (
        db.query(func.sum(PurchaseOrder.total_amount)).scalar() or 0
    )

    summary = f"""
=========================
JAYASREE ERP AI
=========================

BUSINESS OVERVIEW

Total Products : {len(products)}
Total Customers : {len(customers)}
Total Suppliers : {len(suppliers)}
Total Sales Orders : {len(sales)}
Total Purchase Orders : {len(purchases)}

Total Revenue : ₹{total_revenue}
Total Purchase Amount : ₹{total_purchase_amount}

=========================
PRODUCTS
=========================
"""

    if products:
        for p in products:
            summary += f"""
Product : {p.name}
Category : {p.category}
Stock : {p.stock} {p.unit}
Price : ₹{p.price}

"""
    else:
        summary += "No products available.\n"

    summary += """
=========================
CUSTOMERS
=========================
"""

    if customers:
        for c in customers:
            summary += f"""
Customer : {c.name}
Phone : {c.phone}
Outstanding : ₹{c.outstanding_amount}
Credit Limit : ₹{c.credit_limit}

"""
    else:
        summary += "No customers available.\n"

    summary += """
=========================
SUPPLIERS
=========================
"""

    if suppliers:
        for s in suppliers:
            summary += f"""
Supplier : {s.name}
Material : {s.material_type}
Outstanding : ₹{s.outstanding_amount}

"""
    else:
        summary += "No suppliers available.\n"

    summary += """
=========================
SALES ORDERS
=========================
"""

    if sales:
        for s in sales:
            summary += f"""
Order ID : {s.id}
Customer ID : {s.customer_id}
Product ID : {s.product_id}
Quantity : {s.quantity}
Unit Price : ₹{s.unit_price}
Total : ₹{s.total_amount}
Payment Status : {s.payment_status}
Order Status : {s.order_status}

"""
    else:
        summary += "No sales orders.\n"

    summary += """
=========================
PURCHASE ORDERS
=========================
"""

    if purchases:
        for p in purchases:
            summary += f"""
Purchase ID : {p.id}
Supplier ID : {p.supplier_id}
Product ID : {p.product_id}
Quantity : {p.quantity}
Unit Price : ₹{p.unit_price}
Total : ₹{p.total_amount}
Payment Status : {p.payment_status}
Purchase Status : {p.purchase_status}

"""
    else:
        summary += "No purchase orders.\n"

    return summary