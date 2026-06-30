import random
from datetime import datetime, timedelta, timezone


def generate_otp() -> str:
    """
    Generate a 6-digit OTP.
    """
    return str(random.randint(100000, 999999))


def get_otp_expiry() -> datetime:
    """
    OTP expires after 5 minutes.
    """
    return datetime.now(timezone.utc) + timedelta(minutes=5)


def verify_otp(
    saved_otp: str | None,
    entered_otp: str,
    expiry: datetime | None,
) -> bool:
    """
    Verify OTP and handle timezone-aware/naive datetime comparison.
    """

    # OTP must exist
    if saved_otp is None or entered_otp is None:
        return False

    # OTP must match
    if str(saved_otp).strip() != str(entered_otp).strip():
        return False

    # Expiry must exist
    if expiry is None:
        return False

    # Handle timezone mismatch
    if expiry.tzinfo is None:
        expiry = expiry.replace(tzinfo=timezone.utc)

    now = datetime.now(timezone.utc)

    # OTP expired
    if now > expiry:
        return False

    return True