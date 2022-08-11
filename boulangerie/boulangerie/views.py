from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ProductCategory, Product, Order
from .serializers import (
    ProductSerializer,
    ProductCategorySerializer,
    OrderLineSerializer,
    OrderSerializer,
    OrderRecupSerializer,
    OrderLine,
)
from rest_framework import status


class ProductAPIView(APIView):
    def get(self, *args, **kwargs):
        product = Product.objects.filter(available_on_website=True)

        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)


class ProductCategoryAPIView(APIView):
    def get(self, *args, **kwargs):
        productcategories = ProductCategory.objects.all()
        serializer = ProductCategorySerializer(productcategories, many=True)
        return Response(serializer.data)


class OrderAPIView(APIView):
    def get(self, request, *args, **kwargs):
        order = Order.objects.filter(user_id=request.user.id)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        try:
            request.data["order"]["user_id"] = request.user.id
            serializer = OrderSerializer(data=request.data["order"])
            if serializer.is_valid():
                order = serializer.save()
            orderline = request.data["orderline"]
            for line in orderline:
                line.update({"order_id": order.id})
                serializer_orderline = OrderLineSerializer(data=line)
                if serializer_orderline.is_valid():
                    product = Product.objects.get(id=line["product_id"])
                    product.count_sold = product.count_sold + line["quantity"]
                    product.save()
                    serializer_orderline.save()
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class OrderConfirmAPIView(APIView):
    def get(self, request, *args, **kwargs):
        ref = Order.objects.all().order_by("-ref")[:1]
        serializer = OrderRecupSerializer(ref, many=True)
        product = Product.objects.filter(available_on_website=True)
        serializer_product = ProductSerializer(product, many=True)
        orderline = OrderLine.objects.filter(order_id=serializer.data[0]["id"])
        serializer_orderline = OrderLineSerializer(orderline, many=True)
        serializer_orderline.data
        tableau_data = {
            "order": serializer.data,
            "orderline": serializer_orderline.data,
        }
        return Response(tableau_data)


class OrderLineAPIView(APIView):
    def get(self, *args, **kwargs):
        order = OrderLine.objects.all()
        serializer = OrderLineSerializer(order, many=True)
        return Response(serializer.data)
