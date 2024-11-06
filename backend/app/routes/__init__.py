from .auth import router as auth_router
from .bookings import router as bookings_router
from .travel import router as travel_router

# List all routers to be imported in main.py
routers = [
    auth_router,
    bookings_router,
    travel_router
]