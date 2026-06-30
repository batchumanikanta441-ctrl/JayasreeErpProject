from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role
from app.models.product import Product
from app.models.inventory import InventoryTransaction

from app.schemas.inventory import (
    StockTransaction,
    InventoryResponse
)

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)

STAFF_ROLES = ["owner", "admin", "manager", "inventory_staff"]


@router.post(
    "/stock-in",
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def stock_in(
    data: StockTransaction,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == data.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    product.stock += data.quantity

    transaction = InventoryTransaction(
        product_id=data.product_id,
        transaction_type="IN",
        quantity=data.quantity,
        remarks=data.remarks
    )

    db.add(transaction)
    db.commit()

    return {
        "message": "Stock added successfully"
    }


@router.post(
    "/stock-out",
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def stock_out(
    data: StockTransaction,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == data.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    if product.stock < data.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient stock"
        )

    product.stock -= data.quantity

    transaction = InventoryTransaction(
        product_id=data.product_id,
        transaction_type="OUT",
        quantity=data.quantity,
        remarks=data.remarks
    )

    db.add(transaction)
    db.commit()

    return {
        "message": "Stock deducted successfully"
    }


@router.get(
    "/history",
    response_model=list[InventoryResponse],
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def inventory_history(
    db: Session = Depends(get_db)
):
    return db.query(
        InventoryTransaction
    ).all()