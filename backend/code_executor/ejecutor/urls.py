
from django.urls import path

from .views import ejecutar_codigo

urlpatterns = [
    path('api/ejecutar/', ejecutar_codigo, name='ejecutar_codigo'),
]
