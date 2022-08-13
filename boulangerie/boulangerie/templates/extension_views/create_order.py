from cart.cart import Cart
from ...models import   Order, Product, ProductCategory, OrderLine
from datetime import datetime,date

### Function de création des commandes 
### Elle va d'abord initaliser une liste vide quelle va remplir en appelant la class Cart avec comme paramètre request qui contient toutes les données du cart acutel
### elle initalise un dictionnaire avec tous les composants de cart

### Elle insère dans la liste listorder tout les données du dictionnaire sous forme d'une liste de dictionnaire où chaque dictionnaire contiendra un article avec toute ces inforamtions et la quantité souhaitée par le client
### Une fois cette liste remplie elle insère et sauve toutes ces données dans la table Order.
### elle initialise une nouvelle liste lst_tr
### ensuite elle parcours cette liste et réucpère chaque produit de la table produit correspondant au produit traité à l'instant t dans lst_tr
###insère dans la table orderline outes les informations nécéssaire
### calcul le total de quantité vendue par produit. qui sera ensuite insérez dans la table produit afin de connaitre le nombre total de vente de chaque produit
### sauve les données du produits en cours de traitement
### replie la liste lst_tr avec diffèrent pramaètres des produtis et du code html
###renvoie order qui contient l'élément à sauver dans la table order et order_line_tr qui contient le code html pour l'affichage

def create_order(request):
    listeorder=[]
    cart = Cart(request)
    dictionnaireorder = dict(cart.cart.items())
   
    for nombre in dictionnaireorder :
        listeorder.append(dictionnaireorder[nombre])

    order = Order(user_id= request.user, total_price=request.session['sum_cart']['total_price'],date_order=date.today(),date_takeaway=request.session['date'],total_quantity=request.session['sum_cart']['total_quantity'])
    order.save()
    lst_tr = []
    for line in listeorder :
        product = Product.objects.get(id=line['product_id'])
        order_line = OrderLine(order_id=Order.objects.get(id=order.id), product_id=product,quantity=line['quantity'],price=line['price'],image=line['image'])
        product.count_sold=product.count_sold+line['quantity']
        product.save()
        order_line.save()
        lst_tr.append(f'<tr><td>{order_line.product_id.name}</td><td>{order_line.quantity}<td><td>{order_line.price}<td></tr>')
    order_line_tr="<br>".join(lst_tr)
    return order, order_line_tr