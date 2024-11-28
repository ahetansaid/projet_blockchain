from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    country = models.CharField(max_length=100, default='', blank=True)
    phone_number = models.CharField(max_length=20, default='', blank=True)
    
    class Meta:
        db_table = 'auth_user'
        
    def __str__(self):
        return self.username 