from ..serializers import (OrderSerializer,OrderLineSerializer)
from ..models import  Product,Order
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class OrderAPIView(APIView):
    # On récupère les commandes
    def get(self, request, *args, **kwargs):
        order = Order.objects.filter(user_id=request.user.id)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        try:
            # On insère les commande dans la base de donnée
            request.data["order"]["user_id"] = request.user.id
            serializer = OrderSerializer(data=request.data["order"])
            if serializer.is_valid():
                order = serializer.save()
            # On insère les orderlines dans la base de donnée
            orderline = request.data["orderline"]
            for line in orderline:
                line.update({"order_id": order.id})
                serializer_orderline = OrderLineSerializer(data=line)
                if serializer_orderline.is_valid():
                    product = Product.objects.get(id=line["product_id"])
                    # on modifie le nombre total de commande du produit traité
                    product.count_sold = product.count_sold + line["quantity"]
                    product.save()
                    serializer_orderline.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
