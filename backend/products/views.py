from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.permissions import IsAdminUser

from .models import Product, Category
from .serializers import ProductSerializer


class ProductsList(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetails(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'


class ProductCreate(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)