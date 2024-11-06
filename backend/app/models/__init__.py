# This file can be used to initialize the database and import models
from .database import Base, engine

# Import all models here
# from .user import User
# from .booking import Booking

# Create all tables
Base.metadata.create_all(bind=engine)