from django.test import TestCase
from ..models import   Order,Product,ProductCategory
from http import HTTPStatus
import pprint


class OrderTests(TestCase):

    def setUp(self):
        ProductCategory.objects.create(name='patisserie')
        product_cat= ProductCategory.objects.get(name='patisserie')
        Product.objects.create(name='baguel',price='2.00',prix='2',product_category_id=product_cat, image='upload/couques-raisins_NO8TcRo.jpg',count_sold='1')
        Product.objects.create(name='pain',price='1.00',prix='1',product_category_id=product_cat, image='upload/couques-raisins_NO8TcRo.jpg',count_sold='1')
        Product.objects.create(name='choco',price='3.00',prix='3',product_category_id=product_cat, image='upload/couques-raisins_NO8TcRo.jpg',count_sold='1')
        
    def test_cart_add(self):
       
        response1 = self.client.post("/product", data={"product_id":Product.objects.get(name='baguel').id ,"quantity":3})
        response2 = self.client.post("/product", data={"product_id":Product.objects.get(name='pain').id ,"quantity":2})
        response3 = self.client.post("/product", data={"product_id":Product.objects.get(name='choco').id ,"quantity":4})
        response = self.client.get("/mycart")
        
        
        self.assertEqual(response1.status_code, HTTPStatus.OK)
        self.assertEqual(response2.status_code, HTTPStatus.OK)

        for command in response.context['command_order']:
          
            if command['name'] == 'baguel':
                self.assertEqual(command['quantity'], 3)
               
            if  command['name'] == 'pain':
                self.assertEqual(command['quantity'], 2)

            if  command['name'] == 'choco':
                self.assertNotEqual(command['quantity'], 2)
                self.assertEqual(command['quantity'], 4)

        self.assertEqual(self.client.session['sum_cart']['total_quantity'], 9)
        self.assertEqual(self.client.session['sum_cart']['total_price'], 20)
    def test_check_cart (self):
        response = self.client.get("/mycart")
       
    ###def test_title_ending_full_stop(self):
        ###response = self.client.post("/books/add/",
