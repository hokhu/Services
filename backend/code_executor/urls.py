from django.contrib import admin
from django.urls import include, path

from .ejecutor import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('code_executor.ejecutor.urls')),
]
