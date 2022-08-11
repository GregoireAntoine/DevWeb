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


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "user_id",
            "date_order",
            "date_takeaway",
            "total_quantity",
            "total_price",
        ]


class OrderRecupSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "ref",
            "date_order",
            "date_takeaway",
            "total_quantity",
            "total_price",
        ]


class OrderLineSerializer(ModelSerializer):
    class Meta:
        model = OrderLine
        fields = ["order_id", "product_id", "quantity", "price"]
