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
    OrderCommandSerializer,
)
from rest_framework import status
from boulangerie.templates.extension_views.send_mail import sent_order


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

        lst_tr = []
        ### fonction rajout nom
        compteur = 0
        while compteur < len(orderline):
            compteurproduit = 0
            while compteurproduit < len(serializer_product.data):

                if (
                    serializer_orderline.data[compteur]["product_id"]
                    == serializer_product.data[compteurproduit]["id"]
                ):
                    serializer_orderline.data[compteur][
                        "name"
                    ] = serializer_product.data[compteurproduit]["name"]
                compteurproduit = compteurproduit + 1
            lst_tr.append(
                f'<tr><td>{serializer_orderline.data[compteur]["name"]}</td><td>{ serializer_orderline.data[compteur]["quantity"]}<td><td>{ serializer_orderline.data[compteur]["price"]}<td></tr>'
            )
            order_line_tr = "<br>".join(lst_tr)
            compteur = compteur + 1

        ### fonction rajout nom au dessus

        tableau_data = {
            "order": serializer.data,
            "orderline": serializer_orderline.data,
        }
        sent_order(tableau_data, order_line_tr, request.user)

        return Response(tableau_data)


class OrderLineAPIView(APIView):
    def get(self, *args, **kwargs):
        order = OrderLine.objects.all()
        serializer = OrderLineSerializer(order, many=True)
        return Response(serializer.data)


class MyCommandAPIView(APIView):
    def get(self, request, *args, **kwargs):

        order = Order.objects.filter(user_id=request.user.id)
        serializerorder = OrderCommandSerializer(order, many=True)
        tableau_data = []
        product = Product.objects.filter(available_on_website=True)
        serializer_product = ProductSerializer(product, many=True)
        compteur = 0
        while compteur < len(order):

            orderline = OrderLine.objects.filter(
                order_id=serializerorder.data[compteur]["id"]
            )
            serializerorderline = OrderLineSerializer(orderline, many=True)

            compteurorderline = 0
            while compteurorderline < len(serializerorderline.data):
                compteurproduct = 0
                while compteurproduct < len(serializer_product.data):
                    if (
                        serializerorderline.data[compteurorderline]["product_id"]
                        == serializer_product.data[compteurproduct]["id"]
                    ):
                        serializerorderline.data[compteurorderline][
                            "name"
                        ] = serializer_product.data[compteurproduct]["name"]
                    compteurproduct = compteurproduct + 1
                compteurorderline = compteurorderline + 1

            data = {
                "order": serializerorder.data[compteur],
                "orderline": serializerorderline.data,
            }
            tableau_data.append(data)
            compteur = compteur + 1

        return Response(tableau_data)
