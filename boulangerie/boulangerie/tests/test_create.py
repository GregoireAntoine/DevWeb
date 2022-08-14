from django.test import TestCase
from ..models import   Order, Product, ProductCategory, OrderLine

class ProductCategorysTests(TestCase):
    def setUp(self):
        ProductCategory.objects.create(name='patisserie')

    def test_product_category_exist(self):
        product_category=ProductCategory.objects.get(name='patisserie')
        self.assertEqual(product_category.name,'patisserie')

class ProductTests(TestCase):
    def setUp(self):
        ProductCategory.objects.create(name='patisserie')
        product_cat= ProductCategory.objects.get(name='patisserie')
        Product.objects.create(name='baguel',price='2.00',prix='2',product_category_id=product_cat, image='upload/couques-raisins_NO8TcRo.jpg',count_sold='1')

    def test_product_exist(self):
        product=Product.objects.get(name='baguel')
        self.assertEqual(product.name,'baguel')
        self.assertEqual(product.product_category_id.name,'patisserie')


