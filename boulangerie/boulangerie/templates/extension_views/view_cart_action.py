from django.shortcuts import render, redirect
from ...models import Order, Product, ProductCategory, OrderLine
from cart.cart import Cart

### LA fonction recupères la class cart
### elle récupère ensuite le produit grâce à son id et celui recu en paramètre
### On ajoute ensuite le produit au caddie
def cart_add(request, id):
    cart = Cart(request)
    product = Product.objects.get(id=id)
    cart.add(product=product)


### LA fonction recupères la class cart
### Elle récupère le produit grâce à son id
### elle le retire du caddie
### elle met à jour la quantité total de ce produit dans le caddie
### elle renvoie sur la page mycart
def item_clear(request, id):
    cart = Cart(request)  ### LA fonction recupères la class cart
    product = Product.objects.get(id=id)  ### Elle récupère le produit grâce à son id
    cart.remove(product)
    request.session["sum_cart"] = _compute_cart(cart)
    return redirect("mycart")


def item_increment(request, id):
    cart = Cart(request)
    product = Product.objects.get(id=id)
    cart.add(product=product)  ### ajoute la quantité demandé du produit demandé
    request.session["sum_cart"] = _compute_cart(
        cart
    )  ### elle met à jour la quantité total de ce produit dans le caddie
    return redirect("mycart")  ### elle renvoie sur la page mycart


def item_decrement(request, id):
    cart = MyCart(request)
    product = Product.objects.get(id=id)
    cart.mydecrement(product=product)  ### retire la quantité demandé du produit demandé
    request.session["sum_cart"] = _compute_cart(cart)
    return redirect("mycart")


def cart_clear(request):
    cart = Cart(request)
    cart.clear()  ### elle vide le caddie
    request.session["sum_cart"][
        "total_quantity"
    ] = 0  ### mets la quantité total de produit à 0
    request.session["sum_cart"]["total_price"] = 0  ### mets le prix total du caddie à 0
    request.session["date"] = None  ### défini la date comme pas de date grâce à none
    return redirect("mycart")


def cart_detail(request):
    return render(request, "mycart")


### la fonction calcul la quantité total et le prix total du caddie avant de renvoyer ses valeurs sous forme d'un dictionnaire
def _compute_cart(cart):
    cart_quantity = 0
    cart_total = 0
    for product, dct in cart.cart.items():
        cart_quantity = cart_quantity + dct["quantity"]
        cart_total = cart_total + (float(dct["price"]) * dct["quantity"])
    vals = {"total_quantity": cart_quantity, "total_price": round(cart_total, 2)}
    return vals


class MyCart(Cart):
    def mydecrement(self, product):
        for key, value in self.cart.items():
            if key == str(product.id):

                value["quantity"] = value["quantity"] - 1
                if value["quantity"] < 1:
                    product = Product.objects.get(id=product.id)
                    self.remove(product)
                    return redirect("mycart")
                self.save()
                break
            else:
                print("Something Wrong")


### fonction qui de la librairie qui à été modifier afin de plus ajouter seulement une quantité de 1 mais une quanité demandé par l'utilisateur
def add(self, product, quantity, action=None):
    """
    Add a product to the cart or update its quantity.
    """
    id = product.id
    newItem = True
    if str(product.id) not in self.cart.keys():
        self.cart[product.id] = {
            "userid": self.request.user.id,
            "product_id": id,
            "name": product.name,
            "quantity": quantity,
            "price": str(product.price),
            "image": product.image.url,
        }
    else:
        newItem = True
        for key, value in self.cart.items():
            if key == str(product.id):

                value["quantity"] = value["quantity"] + quantity
                newItem = False
                self.save()
                break
        if newItem == True:
            self.cart[product.id] = {
                "userid": self.request,
                "product_id": product.id,
                "name": product.name,
                "quantity": 1,
                "price": str(product.price),
                "image": product.image.url,
            }
    self.save()
