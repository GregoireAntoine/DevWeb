from ..serializers import (OrderCommandSerializer,OrderLineSerializer,ProductSerializer)
from ..models import  Product,Order,OrderLine
from rest_framework.views import APIView
from rest_framework.response import Response



class MyCommandAPIView(APIView):
    def get(self, request, *args, **kwargs):

        order = Order.objects.filter(user_id=request.user.id).order_by("date_takeaway")
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
            tableau_data
        return Response(tableau_data)
