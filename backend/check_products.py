from app.core.database import SessionLocal
from app.models.product import Product

db = SessionLocal()
products = db.query(Product).all()
print(f"Total products in DB: {len(products)}")
for p in products[:5]:
    print(f"- {p.name} ({p.category}) - Stock: {p.stock}")
db.close()
