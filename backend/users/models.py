from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Add custom fields here later, e.g.:
    # bio = models.TextField(blank=True)

    def __str__(self):
        return self.username
