from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.views import APIView
from ..models import  User
class AccountAPIView(APIView):
    def get(self, request, *args, **kwargs):

        access_token_obj = AccessToken(request.data)

        user_id = access_token_obj["user_id"]

        user = User.objects.get(id=user_id)

