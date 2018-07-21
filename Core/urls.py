from django.urls import path

from . import views

urlpatterns = [
    path('loginpswd/', views.loginpswd, name='loginpswd'),
    path('welcome/', views.welcomeIndex, name='welcome')
]