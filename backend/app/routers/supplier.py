from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role
from app.models.supplier import Supplier
from app.schemas.supplier import (
    SupplierCreate,
    SupplierResponse
)

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"]
)

STAFF_ROLES = ["owner", "admin", "manager", "inventory_staff", "accountant"]


@router.post(
    "/",
    response_model=SupplierResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def create_supplier(
    supplier: SupplierCreate,
    db: Session = Depends(get_db)
):
    new_supplier = Supplier(
        name=supplier.name,
        phone=supplier.phone,
        email=supplier.email,
        gst_number=supplier.gst_number,
        address=supplier.address,
        material_type=supplier.material_type
    )

    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)

    return new_supplier


@router.get(
    "/",
    response_model=list[SupplierResponse],
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_suppliers(
    db: Session = Depends(get_db)
):
    return db.query(Supplier).all()


@router.get(
    "/{supplier_id}",
    response_model=SupplierResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_supplier(
    supplier_id: int,
    db: Session = Depends(get_db)
):
    supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()

    if not supplier:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supplier not found"
        )

    return supplier


@router.put(
    "/{supplier_id}",
    response_model=SupplierResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def update_supplier(
    supplier_id: int,
    supplier: SupplierCreate,
    db: Session = Depends(get_db)
):
    db_supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()

    if not db_supplier:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supplier not found"
        )

    db_supplier.name = supplier.name
    db_supplier.phone = supplier.phone
    db_supplier.email = supplier.email
    db_supplier.gst_number = supplier.gst_number
    db_supplier.address = supplier.address
    db_supplier.material_type = supplier.material_type

    db.commit()
    db.refresh(db_supplier)

    return db_supplier


@router.delete(
    "/{supplier_id}",
    dependencies=[Depends(require_role("owner", "admin"))]
)
def delete_supplier(
    supplier_id: int,
    db: Session = Depends(get_db)
):
    supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()

    if not supplier:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supplier not found"
        )

    db.delete(supplier)
    db.commit()

    return {"message": "Supplier deleted successfully"}