from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),  
    path('auth/', obtain_auth_token),  
]


