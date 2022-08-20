from ..serializers import (OrderCommandSerializer,OrderLineSerializer,ProductSerializer)
from ..models import  Product,Order,OrderLine
from rest_framework.views import APIView
from rest_framework.response import Response



class MyCommandAPIView(APIView):
    # fonction de récpération de la commande
    def get(self, request, *args, **kwargs):

        order = Order.objects.filter(user_id=request.user.id).order_by("date_takeaway")
        serializerorder = OrderCommandSerializer(order, many=True)
        tableau_data = []
        product = Product.objects.filter(available_on_website=True)
        serializer_product = ProductSerializer(product, many=True)
        compteur = 0
        # on parcourt le tableau compteur pour récupérer toutes les orderlines correspondantes
        while compteur < len(order):

            orderline = OrderLine.objects.filter(
                order_id=serializerorder.data[compteur]["id"]
            )
            serializerorderline = OrderLineSerializer(orderline, many=True)

            compteurorderline = 0
            # on parcourt les différentes orderlines récupérée
            while compteurorderline < len(serializerorderline.data):
                compteurproduct = 0
                # on récupère le produit de chaque orderlines
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
            # on ajoute au dictionnaire data les commandes avec la ligne order et les ligne orderlines
            data = {
                "order": serializerorder.data[compteur],
                "orderline": serializerorderline.data,
            }
            # on insere le dict data dans la liste tableau_data pour renvoyer les données au bon format
            tableau_data.append(data)
            compteur = compteur + 1
            tableau_data
        return Response(tableau_data)
