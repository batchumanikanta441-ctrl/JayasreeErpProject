from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role

from app.models.purchase import PurchaseOrder
from app.models.product import Product
from app.models.supplier import Supplier

from app.schemas.purchase import (
    PurchaseCreate,
    PurchaseResponse
)

router = APIRouter(
    prefix="/purchases",
    tags=["Purchases"]
)

STAFF_ROLES = ["owner", "admin", "manager", "inventory_staff", "accountant"]


@router.post(
    "/",
    response_model=PurchaseResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def create_purchase(
    purchase: PurchaseCreate,
    db: Session = Depends(get_db)
):
    supplier = db.query(Supplier).filter(
        Supplier.id == purchase.supplier_id
    ).first()

    if not supplier:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supplier not found"
        )

    product = db.query(Product).filter(
        Product.id == purchase.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    total = product.price * purchase.quantity

    product.stock += purchase.quantity

    new_purchase = PurchaseOrder(
        supplier_id=purchase.supplier_id,
        product_id=purchase.product_id,
        quantity=purchase.quantity,
        unit_price=product.price,
        total_amount=total,
        payment_status="Pending",
        purchase_status="Completed"
    )

    db.add(new_purchase)
    db.commit()
    db.refresh(new_purchase)

    return new_purchase


@router.get(
    "/",
    response_model=list[PurchaseResponse],
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_purchases(
    db: Session = Depends(get_db)
):
    return db.query(PurchaseOrder).all()