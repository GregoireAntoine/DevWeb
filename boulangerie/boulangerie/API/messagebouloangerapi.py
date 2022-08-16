from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class MessageAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        sent_message(request.data["subject"], request.data["message"])
        return Response(request.data,status=status.HTTP_200_OK)


def sent_message(subject, message):

        send_mail(
            subject=subject,
            message=message,
            from_email="no-reply@doratiotto.com",
            recipient_list=["doratiottoboulangerie@gmail.com"],
            fail_silently=True,
        )

