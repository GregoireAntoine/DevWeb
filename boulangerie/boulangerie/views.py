from rest_framework.views import APIView
from rest_framework.response import Response
from .models import  Product
from .serializers import ProductSerializer


class ProductAPIView(APIView):
    def get(self, *args, **kwargs):
        product = Product.objects.filter(available_on_website=True)

        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)

