from app.core.database import SessionLocal
from app.models.role import Role

db = SessionLocal()
roles = db.query(Role).all()
print(f"Total roles in DB: {len(roles)}")
for r in roles:
    print(f"- ID: {r.id}, Name: {r.name}, Description: {r.description}")
db.close()
