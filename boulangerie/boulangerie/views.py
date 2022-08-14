from distutils.command.upload import upload
from operator import imod
import pdb
from turtle import update
from urllib import request

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ProductCategory, Product, Order, OrderLine, User
from .serializers import (
    AccountSerializer,
    ProductCategorySerializer,
    ProductSerializer,
    OrderSerializer,
    OrderCommandSerializer,
    OrderRecupSerializer,
    OrderLineSerializer,
    LoginSerializer,
    RegisterSerializer,
    AccountSerializer,
    MessageSerializer,
    DeletePostSerializer,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.generics import GenericAPIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework_simplejwt.tokens import AccessToken
from django.core.mail import send_mail
from boulangerie.templates.extension_views.send_mail import sent_order


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class ProductCategoryAPIView(APIView):
    def get(self, *args, **kwargs):
        productcategories = ProductCategory.objects.all()
        serializer = ProductCategorySerializer(productcategories, many=True)
        return Response(serializer.data)


class ProductAPIView(APIView):
    def get(self, *args, **kwargs):
        product = Product.objects.filter(available_on_website=True)

        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)


class ProductFilterAPIView(APIView):
    def get(self, *args, **kwargs):
        product = Product.objects.filter(available_on_website=True)

        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)


class BestSellerAPIView(APIView):
    def get(self, *args, **kwargs):
        product = Product.objects.all().order_by("-count_sold")[:3]
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)


class OrderConfirmAPIView(APIView):
    def get(self, request, *args, **kwargs):
        ref = Order.objects.all().order_by("-ref")[:1]
        serializer = OrderRecupSerializer(ref, many=True)
        product = Product.objects.filter(available_on_website=True)
        serializer_product = ProductSerializer(product, many=True)
        orderline = OrderLine.objects.filter(order_id=serializer.data[0]["id"])
        serializer_orderline = OrderLineSerializer(orderline, many=True)
        serializer_orderline.data

        lst_tr = []
        ### fonction rajout nom
        compteur = 0
        while compteur < len(orderline):
            compteurproduit = 0
            while compteurproduit < len(serializer_product.data):

                if (
                    serializer_orderline.data[compteur]["product_id"]
                    == serializer_product.data[compteurproduit]["id"]
                ):
                    serializer_orderline.data[compteur][
                        "name"
                    ] = serializer_product.data[compteurproduit]["name"]
                compteurproduit = compteurproduit + 1
            lst_tr.append(
                f'<tr><td>{serializer_orderline.data[compteur]["name"]}</td><td>{ serializer_orderline.data[compteur]["quantity"]}<td><td>{ serializer_orderline.data[compteur]["price"]}<td></tr>'
            )
            order_line_tr = "<br>".join(lst_tr)
            compteur = compteur + 1

        ### fonction rajout nom au dessus

        tableau_data = {
            "order": serializer.data,
            "orderline": serializer_orderline.data,
        }
        sent_order(tableau_data, order_line_tr, request.user, request.user.email)

        return Response(tableau_data)


class OrderAPIView(APIView):
    def get(self, request, *args, **kwargs):
        order = Order.objects.filter(user_id=request.user.id)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        try:
            request.data["order"]["user_id"] = request.user.id
            serializer = OrderSerializer(data=request.data["order"])
            if serializer.is_valid():
                order = serializer.save()
            orderline = request.data["orderline"]
            for line in orderline:
                line.update({"order_id": order.id})
                serializer_orderline = OrderLineSerializer(data=line)
                if serializer_orderline.is_valid():
                    product = Product.objects.get(id=line["product_id"])
                    product.count_sold = product.count_sold + line["quantity"]
                    product.save()
                    serializer_orderline.save()
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class MyCommandAPIView(APIView):
    def get(self, request, *args, **kwargs):

        order = Order.objects.filter(user_id=request.user.id).order_by("date_takeaway")
        serializerorder = OrderCommandSerializer(order, many=True)
        tableau_data = []
        product = Product.objects.filter(available_on_website=True)
        serializer_product = ProductSerializer(product, many=True)
        compteur = 0
        while compteur < len(order):

            orderline = OrderLine.objects.filter(
                order_id=serializerorder.data[compteur]["id"]
            )
            serializerorderline = OrderLineSerializer(orderline, many=True)

            compteurorderline = 0
            while compteurorderline < len(serializerorderline.data):
                compteurproduct = 0
                while compteurproduct < len(serializer_product.data):
                    if (
                        serializerorderline.data[compteurorderline]["product_id"]
                        == serializer_product.data[compteurproduct]["id"]
                    ):
                        serializerorderline.data[compteurorderline][
                            "name"
                        ] = serializer_product.data[compteurproduct]["name"]
                    compteurproduct = compteurproduct + 1
                compteurorderline = compteurorderline + 1

            data = {
                "order": serializerorder.data[compteur],
                "orderline": serializerorderline.data,
            }
            tableau_data.append(data)
            compteur = compteur + 1
            tableau_data
        return Response(tableau_data)


class OrderLineAPIView(APIView):
    def get(self, *args, **kwargs):
        order = OrderLine.objects.all()
        serializer = OrderLineSerializer(order, many=True)
        return Response(serializer.data)


class AccountAPIView(APIView):
    def get(self, request, *args, **kwargs):

        access_token_obj = AccessToken(request.data)

        user_id = access_token_obj["user_id"]

        user = User.objects.get(id=user_id)


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


class MessageAPIView(APIView):
    def post(self, request, *args, **kwargs):
        sent_message(request.data["subject"], request.data["message"])
        return Response(request.data)


def sent_message(subject, message):

    send_mail(
        subject=subject,
        message=message,
        from_email="no-reply@doratiotto.com",
        recipient_list=["doratiottoboulangerie@gmail.com"],
        fail_silently=True,
    )


class DeletePostViewSet(APIView):
    def delete(self, request, pk, format=None):
        snippet = Order.objects.filter(id=pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    """ def post(self, request, *args, **kwargs):
        Order.objects.filter(ref=request.data).delete()
        return Response(request.data) """


""" def post(self, request, format=None):

        serializer = RegisterSerializer(data=request.data["register"])
        order = serializer.save() """


"""
from asyncio.windows_events import NULL
from datetime import datetime
from itertools import product
from pdb import Pdb
from django.forms import ModelForm
from moneyed import SBD
from requests import request
from .models import Order, Product, ProductCategory, OrderLine
from django.shortcuts import render
from django.shortcuts import render, redirect
from .models import Product
from cart.cart import Cart
from django.http import HttpResponse
from datetime import date, timedelta
from django import template
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required


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
from boulangerie.templates.extension_views.send_mail import sent_order
from boulangerie.templates.extension_views.sample_view import sample_view
from boulangerie.templates.extension_views.create_order import create_order
from boulangerie.templates.extension_views.view_best_sell import bestsell

register = template.Library()


@register.filter()
def rangedef(min=5):
    return rangedef(min)


### cette fonction récupère les produits afin des lafficher sur la page product
def product(request):

    if request.POST:
        quantity = request.POST["quantity"]
        product_id = request.POST["product_id"]
        cart = Cart(request)  ### on appelle la class Cart
        product = Product.objects.get(
            id=product_id
        )  ### on récupère les objects grâce à leurs id
        add(
            cart, product=product, quantity=int(quantity)
        )  ###on appelle la fonction add
        request.session["sum_cart"] = _compute_cart(
            cart
        )  ### on insère la quantité total dans request.session['su_cart"]
    ###On renvoie request, la page que le veut afficher et deux fontion, la première products qui renvoie tout les objets filtrer sur available_on_website et une autre product_categories aussi filtrée sur ce point
    return render(
        request,
        "product.html",
        {
            "products": Product.objects.filter(available_on_website=True).order_by(
                "name"
            ),
            "product_categories": ProductCategory.objects.filter(
                available_on_website=True
            ),
        },
    )


### Cette fonction renvoie la la page de description de chaque produit
def product_description(request, product_id):
    ###On renvoie request, la page que le veut afficher et une fonction product qui récupère tout les produits avec l'id correspondant à celui recu en paramètre
    return render(
        request,
        "product_description.html",
        {"product": Product.objects.get(id=product_id)},
    )


def product_category(request, product_category):
    summary_
    Args:
        request (_type_): _description_
        product_category (_type_): _description_

    Returns:
        _type_: _description_
    
    ###On renvoie request, la page que le veut afficher et deux fontion, la première products qui renvoie tout les objets filtrer sur available_on_website et une autre product_categories aussi filtrée sur ce point
    ### Mais aussi tout les deux filtrer sur le product_category_id_id qui défini à quel type ils appartiennt ( Viennoiserie, pain blanc, pain gris)
    return render(
        request,
        "product_category.html",
        {
            "products": Product.objects.filter(
                product_category_id_id=product_category, available_on_website=True
            ),
            "product_categories": ProductCategory.objects.filter(
                available_on_website=True
            ),
        },
    )


### à faire
def command(request):
    _summary_

    :param request: request
    :type request: _type_
    :param reg: _description_
    :type reg: _type_
    
    if "valider" in request.POST:
        orderid = float(request.POST["valider"])
        print(orderid)
    curuser = sample_view(request)
    currentuser = str(curuser)
    return render(
        request,
        "command.html",
        {"order_forms": Order.objects.filter(user_id=currentuser)},
    )


### affiche la page home avec en plus une fonction récupère les 3 produits les plus vendu en se basant sur count_sold
def home(request):
    request.session["count"] = [number for number in range(1, 51)]
    return render(
        request,
        "home.html",
        {
            "products": Product.objects.filter(available_on_website=True).order_by(
                "-count_sold"
            )[:3],
            "product_categories": ProductCategory.objects.filter(
                available_on_website=True
            ).order_by("name"),
        },
    )


### fonction qui affiche la page de récupèreation de l'heure et qui la traite aussi
def dateorder(request):
    if request.user.is_authenticated == True:  ### regarde si un user est authentifier

        listeorder = []
        cart = Cart(request)
        dictionnaireorder = dict(cart.cart.items())
        for nombre in dictionnaireorder:
            listeorder.append(dictionnaireorder[nombre])
        mindate = datetime.now() + timedelta(
            days=1
        )  ### défini la valeur minimale qui peut être cochée par l'utilisteur ici j+1
        maxdate = mindate + timedelta(
            weeks=2
        )  ### défini la valeur maximale qui peut être cochée par l'utilisteur ici j+15
        ### renvoie request, la page et 3 éléments, une lsite contenant les éléments présents dans le caddies, la date minimum et la date maximum évoqué ci dessus qui sseront utilisés dans le HTML
        return render(
            request,
            "dateorder.html",
            {
                "command_order": listeorder,
                "mindate": mindate.strftime("%Y-%m-%d"),
                "maxdate": maxdate.strftime("%Y-%m-%d"),
            },
        )
    else:  ### si user pas authentifier redirigé automatiquement vers la page index
        return render(request, "index.html")


### fonctiuon qui créer et sauve la commande du cleint, elle lui envoie aussi un mail de confiramtion
def confirmationorder(request):
    order, order_line_tr = create_order(request)

    sent_order(order, order_line_tr, request)
    return render(request, "confirmationorder.html", {"order": order})


### défini la vue mycart
def mycart(request):
    listeorder = []
    cart = Cart(request)
    dictionnaireorder = dict(cart.cart.items())
    for nombre in dictionnaireorder:
        listeorder.append(dictionnaireorder[nombre])

    return render(request, "mycart.html", {"command_order": listeorder})


### page recapitulative avec sous forme d'un grand tableau toutes les informations rentrées par l'utilisateur.
def recapitulatif(request):
    request.session["date"] = request.POST["delivery_date"]
    date = datetime.strptime(request.POST["delivery_date"], "%Y-%m-%d").strftime(
        "%d-%m-%Y"
    )
    listeorder = []
    cart = Cart(request)
    dictionnaireorder = dict(cart.cart.items())
    for nombre in dictionnaireorder:
        listeorder.append(dictionnaireorder[nombre])
    return render(
        request, "recapitulatif.html", {"command_order": listeorder, "date": date}
    )


@login_required(login_url="/accounts/login")  # redirect when user is not logged in
def my(request):
    return render(request, "account/my.html")
"""
