from ..models import  Order
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class DeletePostViewSet(APIView):
    def delete(self, request, pk, format=None):
        # supression de la commande ayant l'id égal à pk
        snippet = Order.objects.filter(id=pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
