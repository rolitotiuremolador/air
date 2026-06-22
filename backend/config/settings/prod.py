import os
from .base import *

SECRET_KEY = os.environ.get('SECRET_KEY')

DEBUG = False

# Add your production domain here
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# In production, use PostgreSQL (e.g., via dj-database-url)
DATABASES = {
    'default': {
        # Configure your production database here
    }
}