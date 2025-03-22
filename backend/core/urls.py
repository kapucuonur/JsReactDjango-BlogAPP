from django.urls import path, include
from .views import ArticleViewSet, UserViewSet, CustomObtainAuthToken  # Import custom auth token view
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/', CustomObtainAuthToken.as_view(), name='custom_obtain_token'),  # Updated
]
