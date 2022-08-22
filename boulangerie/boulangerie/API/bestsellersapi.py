from ..serializers import (ProductSerializer)
from ..models import  Product
from rest_framework.views import APIView
from rest_framework.response import Response


class BestSellerAPIView(APIView):
    def get(self, *args, **kwargs):
        #Récupération des 3 produits les plus vendus
        product = Product.objects.all().order_by("-count_sold")[:3]
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)