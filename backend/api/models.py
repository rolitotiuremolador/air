from django.db import models
from django.contrib.auth.models import User
from config import settings

class Idea(models.Model):
    CATEGORY_CHOICES = [
        ('TECHNICAL', 'Technical'),
        ('LIFE', 'Life'),
        
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    create_at = models.DateTimeField(auto_now_add=True)
    # author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ideas")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, 
    on_delete=models.CASCADE,
    related_name="ideas")

    def __str__(self):
        return f"{self.title} ({self.category})"
