from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post(
    "/",
    response_model=ProductResponse,
    dependencies=[Depends(require_role("owner", "admin", "manager", "inventory_staff"))]
)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    new_product = Product(
        name=product.name,
        category=product.category,
        brand=product.brand,
        description=product.description,
        price=product.price,
        mrp=product.mrp,
        stock=product.stock,
        unit=product.unit,
        image=product.image,
        rating=product.rating,
        review_count=product.review_count,
        min_order_qty=product.min_order_qty,
        slug=product.slug
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.get("/", response_model=list[ProductResponse])
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    return product


@router.put(
    "/{product_id}",
    response_model=ProductResponse,
    dependencies=[Depends(require_role("owner", "admin", "manager", "inventory_staff"))]
)
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    db_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    db_product.name = product.name
    db_product.category = product.category
    db_product.brand = product.brand
    db_product.description = product.description
    db_product.price = product.price
    db_product.mrp = product.mrp
    db_product.stock = product.stock
    db_product.unit = product.unit
    db_product.image = product.image
    db_product.rating = product.rating
    db_product.review_count = product.review_count
    db_product.min_order_qty = product.min_order_qty
    db_product.slug = product.slug

    db.commit()
    db.refresh(db_product)

    return db_product


@router.delete(
    "/{product_id}",
    dependencies=[Depends(require_role("owner", "admin", "manager"))]
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }