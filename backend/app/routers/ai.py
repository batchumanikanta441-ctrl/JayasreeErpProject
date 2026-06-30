from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role
from app.ai.gemini_service import ask_gemini
from app.services.erp_ai_service import get_business_summary

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)

STAFF_ROLES = ["owner", "admin", "manager", "sales_staff", "inventory_staff", "accountant"]


class AIRequest(BaseModel):
    question: str


@router.post(
    "/ask",
    dependencies=[Depends(require_role(*STAFF_ROLES))]
)
def ask_ai(
    request: AIRequest,
    db: Session = Depends(get_db)
):
    summary = get_business_summary(db)

    prompt = f"""
You are an ERP AI Assistant.

Business Data:

{summary}

User Question:

{request.question}

Answer professionally.
"""

    answer = ask_gemini(prompt)

    return {
        "question": request.question,
        "answer": answer
    }