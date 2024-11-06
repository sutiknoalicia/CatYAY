from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup for Expo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
# from app.routes import auth, bookings, travel

# Register routes
# app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
# app.include_router(bookings.router, prefix="/api/bookings", tags=["bookings"])
# app.include_router(travel.router, prefix="/api/travel", tags=["travel"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)