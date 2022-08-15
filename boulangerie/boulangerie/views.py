from distutils.command.upload import upload
from itertools import product
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



from .API.productapi import ProductAPIView
from .API.productcategoryapi import ProductCategoryAPIView
from .API.bestsellersapi import BestSellerAPIView
from .API.orderconfirmapi import OrderConfirmAPIView
from .API.orderapi import OrderAPIView
from .API.mycommandapi import MyCommandAPIView
from .API.deletecommandapi import DeletePostViewSet
from .API.messagebouloangerapi import *
from .API.registerapi import RegisterAPIView
from .API.loginapi import LoginView
from .API.accountapi import AccountAPIView







   