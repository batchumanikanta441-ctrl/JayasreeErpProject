from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime, timezone

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    phone = Column(String, unique=True, nullable=False)

    password_hash = Column(String, nullable=False)

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        nullable=True
    )

    role = Column(String, default="customer")

    email_verified = Column(Boolean, default=False)

    phone_verified = Column(Boolean, default=False)

    otp = Column(String, nullable=True)

    # Store timezone-aware datetime
    otp_expiry = Column(DateTime(timezone=True), nullable=True)

    last_login = Column(DateTime(timezone=True), nullable=True)

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )