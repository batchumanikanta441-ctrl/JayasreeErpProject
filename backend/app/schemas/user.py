from pydantic import BaseModel, EmailStr


class UserLogin(BaseModel):
    email: str
    password: str


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    role_id: int | None = None


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    role_id: int | None = None

    class Config:
        from_attributes = True


class SendOTPRequest(BaseModel):
    login: str


class VerifyOTPRequest(BaseModel):
    login: str
    otp: str
