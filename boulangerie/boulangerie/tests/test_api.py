from wsgiref import headers
from rest_framework.test import APIRequestFactory
import random
import pdb
from rest_framework.test import RequestsClient
from requests.auth import HTTPBasicAuth
import json
from django.test import TestCase
from rest_framework.test import APITestCase
import requests
from rest_framework.test import APIClient


class Order(TestCase):

    def test_getproduct_with_authentification(self):
        s = requests.Session()
        s.auth = ('gregoire', 'antoine21')
        s.headers.update({'x-test': 'true'})    
        
        product_response = s.get("http://127.0.0.1:8000/api/product?available_on_website=True" )
        assert product_response.status_code == 200
        assert product_response.headers["Content-Type"] == "application/json"

    def test_getproduct_without_authentification(self):
        product_response = self.client.get(
            "http://127.0.0.1:8000/api/product?available_on_website=True"
        )
        assert product_response.status_code == 403
        assert product_response.headers["Content-Type"] == "application/json"


    def test_create_order(self):
        s = requests.Session()
        s.auth = ('gregoire', 'antoine21')
        s.headers.update({'x-test': 'true'})
        product_response = s.get(
            "http://127.0.0.1:8000/api/product?available_on_website=True"
        )
        data = {'order': {'date_order': '2022-08-15', 'date_takeaway': '2022-08-29'}}
        product_random = random.choice(json.loads(product_response.text))
        data['orderline'] = []
        data['orderline'].append(
            {
                'product_id': product_random["id"],
                'quantity': random.randint(1, 100),
                'price': product_random["price"],
            }
        )
        order = s.post("http://127.0.0.1:8000/api/order", json=data)
        assert order.status_code == 201




