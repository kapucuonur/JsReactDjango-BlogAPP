from rest_framework import serializers, viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from .serializers import ArticleSerializer, UserSerializer
from .models import Article
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]  # 🔹 Ensure only logged-in users can access

    def perform_create(self, serializer):
        """🔹 Automatically associate logged-in user with the article"""
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        """🔹 Custom update method to catch errors"""
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """🔹 Custom delete method to prevent accidental errors"""
        try:
            return super().destroy(request, *args, **kwargs)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
