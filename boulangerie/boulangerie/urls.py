"""boulangerie URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from atexit import register
from itertools import product
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from . import views
from django.contrib.auth.views import LogoutView
from django.conf.urls.static import static
from django.conf import settings
from .views import (
    ProductCategoryAPIView,
    ProductAPIView,
    OrderAPIView,
    OrderLineAPIView,
    LoginView,
    RegisterAPIView,
    AccountAPIView,
    BestSellerAPIView,
    OrderConfirmAPIView,
    ProductFilterAPIView,
    MessageAPIView,
    MyCommandAPIView,
    DeletePostViewSet,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/productcategory", ProductCategoryAPIView.as_view()),
    path("api/productcategory/<int:pk>/", ProductCategoryAPIView.as_view()),
    path("api/product", ProductAPIView.as_view()),
    path("api/product/<int:pk>/", ProductAPIView.as_view()),
    path("product", ProductAPIView.as_view()),
    path("api/message", MessageAPIView.as_view()),
    path("api/productfiltercategory", ProductFilterAPIView.as_view()),
    path("api/orderconfirm", OrderConfirmAPIView.as_view()),
    path("api/bestsellers", BestSellerAPIView.as_view()),
    path("api/order", OrderAPIView.as_view()),
    path("api/mycommand", MyCommandAPIView.as_view()),
    path("api/orderline", OrderLineAPIView.as_view()),
    path("api/login", LoginView.as_view()),
    path("api/delete/<int:pk>/", DeletePostViewSet.as_view()),
    path("api/register", RegisterAPIView.as_view()),
    path("api/myaccount", AccountAPIView.as_view()),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
