from ..models import  User
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from ..serializers import (RegisterSerializer)

class RegisterAPIView(APIView):
    """
    Check the credentials and return the REST Token
    if the credentials are valid and authenticated.
    Calls Django Auth login method to register User ID
    in Django session framework

    Accept the following POST parameters: username, password
    Return the REST Framework Token Object's key.
    """

    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    ###token_model = TokenModel
    def post(self, request, *args, **kwargs):
        self.request = request

        userrs = User.objects.create_user(
            self.request.data["username"],
            self.request.data["email"],
            self.request.data["password"],
        )

        userrs.save()

        return self.get_response()
