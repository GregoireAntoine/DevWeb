from ..serializers import (ProductSerializer,OrderRecupSerializer,OrderLineSerializer)
from ..models import  Product,Order,OrderLine
from rest_framework.views import APIView
from rest_framework.response import Response
from boulangerie.templates.extension_views.send_mail import sent_order

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
        sent_order(tableau_data, order_line_tr, request.user, request.user.email)

        return Response(tableau_data)

