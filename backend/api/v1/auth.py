from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.api import deps
from backend.core.security import verify_password, get_password_hash, create_access_token
from backend.models import User, AuditLog
from backend.schemas import UserCreate, UserResponse, Token, LoginRequest, ForgotPasswordRequest

router = APIRouter()

@router.post("/login", response_model=Token)
def login(login_req: LoginRequest, db: Session = Depends(deps.get_db)):
    user = db.query(User).filter(User.email == login_req.email).first()
    if not user or not verify_password(login_req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Audit log
    audit = AuditLog(
        user_id=user.id,
        action="USER_LOGIN",
        entity_type="USER",
        entity_id=str(user.id),
        details={"email": user.email}
    )
    db.add(audit)
    db.commit()

    token = create_access_token(subject=str(user.id))
    return Token(access_token=token, token_type="bearer", user=user)

@router.post("/signup", response_model=UserResponse)
def signup(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed = get_password_hash(user_in.password)
    user = User(
        email=user_in.email,
        hashed_password=hashed,
        full_name=user_in.full_name,
        role=user_in.role,
        badge_number=user_in.badge_number,
        agency=user_in.agency
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    audit = AuditLog(
        user_id=user.id,
        action="USER_REGISTERED",
        entity_type="USER",
        entity_id=str(user.id),
        details={"email": user.email}
    )
    db.add(audit)
    db.commit()

    return user

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(deps.get_current_user)):
    return current_user

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(deps.get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    return {"message": "If the account exists, password reset instructions have been dispatched.", "status": "sent"}
