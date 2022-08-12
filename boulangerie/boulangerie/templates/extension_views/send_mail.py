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


def sent_order(order, lst, user):

    send_mail(
        subject=f"Votre commande numéro {order['order'][0]['ref']} a bien été enregistrée",
        message=f"""
                      
                        Bonjour {user},
                        Votre commande numéro {order['order'][0]['ref']} a bien été enregistrée.
                        Voici le récapitulatif de celle-ci:
                        Afficher la liste
                        La date prévu pour récupérer la commande est le : {order['order'][0]['date_takeaway']}
    
                        Merci pour votre confiance""",
        html_message=f"""<body><div style="margin: 0px; padding: 0px;">
                       
                        Bonjour {user},<br>
                        Votre commande numéro {order['order'][0]['ref']} a bien été enregistrée.<br>
                        Voici le récapitulatif de celle-ci:<br>
                        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"><center>Articles</center></th>
          
            <th scope="col"><center>Quantité</center></th>
            
            <th scope="col"><center>Prix</center></th>
            
          </tr>
        </thead>
        <tbody>

        {lst}
        </tbody>
      </table>

                        La date prévu pour récupérer la commande est le : {order['order'][0]['date_takeaway']}<br>
    
                        Merci pour votre confiance</div></body>""",
        from_email="no-reply@doratiotto.com",
        recipient_list=["gregoireantoine21@gmail.com"],
        fail_silently=True,
    )
