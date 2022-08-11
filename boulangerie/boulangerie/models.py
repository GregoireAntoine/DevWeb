from cProfile import label
from distutils.command.upload import upload
from django.db import models
from django.forms import ImageField
from djmoney.models.fields import MoneyField
from django.contrib.auth.models import User
from django.db.models import Sum


class ProductCategory(models.Model):
    class Meta:
        ordering = ["name"]

    name = models.CharField("Nom", max_length=25)
    available_on_website = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    class Meta:
        ordering = ["name"]

    name = models.CharField("Nom", max_length=25)
    price = models.FloatField()
    product_category_id = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="upload/", blank=True)
    count_sold = models.IntegerField(default=0)
    available_on_website = models.BooleanField(default=True)

    def __str__(self):
        return self.name



