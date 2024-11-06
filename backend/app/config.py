from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_PORT: int = 8000
    DATABASE_URL: str

    class Config:
        env_file = ".env"

settings = Settings()