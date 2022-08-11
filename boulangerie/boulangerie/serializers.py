from .models import ProductCategory, Product, Order, User, OrderLine
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
            "product_category_id",
            "image",
            "available_on_website",
        ]


class ProductCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["id", "name", "available_on_website"]
