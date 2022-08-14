from pyexpat import model
import pdb
from requests import post
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import ProductCategory, Product, Order, User, OrderLine
from django.contrib.auth import get_user_model, authenticate


class ProductCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["id", "name", "available_on_website"]


class MessageSerializer(ModelSerializer):
    class Meta:
        fields = ["subject", "message"]


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


class DeletePostSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


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


class OrderCommandSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "user_id",
            "ref",
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


UserModel = get_user_model()


class RegisterSerializer(ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(style={"input_type": "password"})

    def authenticate(self, **kwargs):
        return authenticate(self.context["request"], **kwargs)

    def validate(self, attrs):
        username = attrs.get("username")
        email = attrs.get("email")
        password = attrs.get("password")
        user = None
        try:
            username = UserModel.objects.get(email__iexact=email).get_username()
        except UserModel.DoesNotExist:
            pass

        if username:
            user = email

            ###user = self.validate_username_email(username, "", password)
        import pdb

        pdb.set_trace()
        attrs["user"] = user
        return self.context["request"]["data"]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(style={"input_type": "password"})

    ###user = self.validate_username_email(username, "", password)


class AccountSerializer(serializers.Serializer):
    class Meta:
        model = OrderLine
        fields = ["username", "email", "password"]


###request._full_data
