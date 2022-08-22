from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class MessageAPIView(APIView):
    # Envoie du message 
    # on récupère le sujet et le message écrit par l'utilisateur
    def post(self, request, *args, **kwargs):
        # on appel la fonction sent message
        sent_message(request.data["subject"], request.data["message"])
        return Response(request.data,status=status.HTTP_200_OK)


def sent_message(subject, message):
        # fonction d'envoie du mail
        send_mail(
            # on insère le sujet reçu en paramètre dans subject
             # on insère le messsage reçu en paramètre dans message
            subject=subject,
            message=message,
            from_email="no-reply@doratiotto.com", # email de départ
            recipient_list=["doratiottoboulangerie@gmail.com"], # email de destination
            fail_silently=True,
        )

