from ..serializers import (ProductSerializer)
from ..models import  Product
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status


class ProductAPIView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        available_on_website = self.request.query_params.get(
            "available_on_website", None
        )
        product_category_id = self.request.query_params.get("product_category_id", None)
        if product_category_id:
            if available_on_website:
                product = Product.objects.filter(
                    available_on_website=available_on_website,
                    product_category_id=product_category_id,
                )
                return product
            else:
                product = Product.objects.filter(
                    product_category_id=product_category_id
                )
            return product

        elif available_on_website:
            product = Product.objects.filter(available_on_website=available_on_website)
            return product

        else:
            return super().get_queryset()

    def post(self, request, format=None):

        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, pk, format=None):
        snippet = Product.objects.filter(id=pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request,format=None):
        
        snippet = Product.objects.get(name=request.data['name'])
        serializer = ProductSerializer(snippet, data=request.data)
       
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

