from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role
from app.models.role import Role

from app.schemas.role import (
    RoleCreate,
    RoleResponse
)

router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


@router.post(
    "/",
    response_model=RoleResponse,
    dependencies=[Depends(require_role("owner", "admin"))]
)
def create_role(
    role: RoleCreate,
    db: Session = Depends(get_db)
):
    existing_role = db.query(Role).filter(
        Role.name == role.name
    ).first()

    if existing_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role already exists"
        )

    new_role = Role(
        name=role.name,
        description=role.description
    )

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


@router.get(
    "/",
    response_model=list[RoleResponse],
    dependencies=[Depends(require_role("owner", "admin"))]
)
def get_roles(
    db: Session = Depends(get_db)
):
    return db.query(Role).all()


@router.get(
    "/{role_id}",
    response_model=RoleResponse,
    dependencies=[Depends(require_role("owner", "admin"))]
)
def get_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )

    return role


@router.delete(
    "/{role_id}",
    dependencies=[Depends(require_role("owner", "admin"))]
)
def delete_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )

    db.delete(role)
    db.commit()

    return {
        "message": "Role deleted successfully"
    }