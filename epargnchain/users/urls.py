from django.urls import path
from . import views

urlpatterns = [
    # ... autres URLs ...
    path('profile/update/', views.profile, name='profile'),
    path('profile/delete/', views.delete_account, name='delete_account'),
] 