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


class Order(models.Model):
    ref = models.CharField("Reference", max_length=25)
    user_id = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    date_order = models.DateField("Date de commande", blank=True, null=True)
    date_takeaway = models.DateField("Date d'enlèvement", blank=True, null=True)
    total_quantity = models.FloatField("Quantité total", blank=True, null=True)
    total_price = models.FloatField("Prix total", blank=True, null=True)

    def get_next_value(self):
        last_sequence = Order.objects.last()
        if last_sequence:
            seq = int(last_sequence.ref[-3:]) + 1
        else:
            seq = 1
        return f"SO{seq:03}"

    def save(self, *args, **kwargs):
        self.ref = self.get_next_value()
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.ref


class OrderLine(models.Model):
    order_id = models.ForeignKey(
        "Order", blank=True, null=True, on_delete=models.CASCADE
    )
    product_id = models.ForeignKey(
        "Product", blank=True, null=True, on_delete=models.CASCADE
    )
    price = models.FloatField()

    quantity = models.FloatField()
    image = models.CharField("image", max_length=50, default="5", blank=True, null=True)

    def __str__(self):
        return self.order_id.ref
