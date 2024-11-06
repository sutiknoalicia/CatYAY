from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def create_app():
    app = FastAPI(title="Cathay Intermodal API")
    
    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # For development. In production, specify your Expo app URL
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    return app