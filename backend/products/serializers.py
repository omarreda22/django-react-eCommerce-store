from rest_framework import serializers

from .models import Product, Category


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    slug = serializers.CharField(read_only=True)
    category_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = [
            '_id',
            'user',
            'name',
            'slug',
            'image',
            'brand',
            'category',
            'category_name',
            'description',
            'rating',
            'numReviews',
            'price',
            'countinStock',
            'created'
        ]

    def get_category_name(self, obj):
        return f'{obj.category}'