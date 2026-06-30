from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role
from app.models.supplier_ledger import SupplierLedger
from app.models.supplier import Supplier
from app.models.purchase import PurchaseOrder

from app.schemas.supplier_ledger import (
    SupplierLedgerCreate,
    SupplierLedgerResponse
)

router = APIRouter(
    prefix="/supplier-ledger",
    tags=["Supplier Ledger"]
)

STAFF_ROLES = ["owner", "admin", "manager", "accountant"]


@router.post(
    "/",
    response_model=SupplierLedgerResponse,
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def create_ledger(
    ledger: SupplierLedgerCreate,
    db: Session = Depends(get_db)
):
    supplier = db.query(Supplier).filter(
        Supplier.id == ledger.supplier_id
    ).first()

    if not supplier:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supplier not found"
        )

    purchase = db.query(PurchaseOrder).filter(
        PurchaseOrder.id == ledger.purchase_order_id
    ).first()

    if not purchase:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Purchase order not found"
        )

    previous_balance = (
        db.query(SupplierLedger)
        .filter(SupplierLedger.supplier_id == ledger.supplier_id)
        .order_by(SupplierLedger.id.desc())
        .first()
    )

    balance = (
        previous_balance.balance if previous_balance else 0
    )

    balance = balance + ledger.debit - ledger.credit

    new_entry = SupplierLedger(
        supplier_id=ledger.supplier_id,
        purchase_order_id=ledger.purchase_order_id,
        debit=ledger.debit,
        credit=ledger.credit,
        balance=balance,
        remarks=ledger.remarks
    )

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return new_entry


@router.get(
    "/",
    response_model=list[SupplierLedgerResponse],
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_ledger(
    db: Session = Depends(get_db)
):
    return db.query(SupplierLedger).all()


@router.get(
    "/{supplier_id}",
    response_model=list[SupplierLedgerResponse],
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def get_supplier_ledger(
    supplier_id: int,
    db: Session = Depends(get_db)
):
    return db.query(SupplierLedger).filter(
        SupplierLedger.supplier_id == supplier_id
    ).all()