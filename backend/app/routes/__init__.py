from fastapi import APIRouter

router = APIRouter()

# Import other route modules and include them
from .auth import router as auth_router
from .bookings import router as bookings_router
from .travel import router as travel_router

# Register other routers
router.include_router(auth_router, prefix="/api/auth", tags=["auth"])
router.include_router(bookings_router, prefix="/api/bookings", tags=["bookings"])
router.include_router(travel_router, prefix="/api/travel", tags=["travel"])