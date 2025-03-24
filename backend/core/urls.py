from django.urls import path, include
from .views import ArticleViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('articles', ArticleViewSet, basename='articles')
router.register('users', UserViewSet, basename='users')  # Added basename for users

urlpatterns = [
    path('api/', include(router.urls)),
]