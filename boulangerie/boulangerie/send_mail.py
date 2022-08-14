from django.core.mail import send_mail
from boulangerie.templates.extension_views.view_cart_action import (
    cart_add,
    item_clear,
    item_increment,
    item_decrement,
    cart_clear,
    cart_detail,
    _compute_cart,
    MyCart,
    add,
)

### fonction d'envoi de mail de confirmation
### on appelle la fonction send mail, on la remplie de code html avec le numéro de commande, le user, la date demandé,
### on fait de meme avec le code html pour afficher sous forme de page web
### on dicte qui est le destinataire, celui qui envoie et les paramètres de raté
### enfin on cide le cart du client.


def sent_order(subject, message):

    send_mail(
        subject=subject,
        message=message,
        from_email="no-reply@doratiotto.com",
        recipient_list=["françois@burniaux.com", "gregoireantoine21@gmail.com"],
        fail_silently=True,
    )
