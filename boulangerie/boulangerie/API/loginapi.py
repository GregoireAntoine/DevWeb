from ..models import  User
from rest_framework.views import APIView
from ..serializers import (LoginSerializer)
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class LoginView(APIView):
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        username = serializer.data.get("username")
        password = serializer.data.get("password")
        user = authenticate(username=username, password=password)


        if user is not None:
            token = get_tokens_for_user(user)
            return Response(
                {"token": token, "msg": "Login Success", "user": user.username},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"errors": {"non_field_errors": ["Email or Password is not Valid"]}},
                status=status.HTTP_404_NOT_FOUND,
            )
