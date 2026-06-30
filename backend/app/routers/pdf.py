from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.invoice import Invoice

from app.services.pdf_service import generate_invoice_pdf

router = APIRouter(
    prefix="/pdf",
    tags=["PDF Invoice"]
)


@router.get("/invoice/{invoice_id}")
def download_invoice(
    invoice_id: int,
    db: Session = Depends(get_db)
):

    invoice = db.query(Invoice).filter(
        Invoice.id == invoice_id
    ).first()

    if not invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found"
        )

    pdf = generate_invoice_pdf(invoice)

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f"attachment; filename=invoice_{invoice_id}.pdf"
        }
    )