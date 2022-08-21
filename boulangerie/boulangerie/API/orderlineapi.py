from ..serializers import (OrderSerializer,OrderLineSerializer)
from ..models import  Product,Order
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class OrderlineAPIView(APIView):
    def update(self, request, pk):
        try:
            order = Order.objects.filter(id=pk)
            serializer = OrderLineSerializer(order,data=request.data)

            print(serializer)
            print(order)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
