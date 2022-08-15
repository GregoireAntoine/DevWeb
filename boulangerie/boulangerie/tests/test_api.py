from rest_framework.test import APIRequestFactory
import random
import pdb
from rest_framework.test import RequestsClient
from requests.auth import HTTPBasicAuth
import json
from django.test import TestCase
from rest_framework.test import APITestCase

class Order(TestCase):
    def setUp(self):
        client = RequestsClient()
        return super().setUp()

    def test_getproduct_with_authentification(self):
        self.client.headers.update({"x-test": "true"})
        self.client.headers.update({"Content-Type": "application/json"})
        self.client.auth = HTTPBasicAuth("gregoire", "antoine21")
        product_response = self.client.get(
            "http://127.0.0.1:8000/api/product"
        )
        assert product_response.status_code == 200
        assert product_response.headers["Content-Type"] == "application/json"

    def test_getproduct_without_authentification(self):
        product_response = self.client.get(
            "http://127.0.0.1:8000/api/product?available_on_website=True"
        )
        assert product_response.status_code == 403
        assert product_response.headers["Content-Type"] == "application/json"


    def test_create_order(self):
        self.client.auth = HTTPBasicAuth("gregoire", "antoine21")
        product_response = self.client.get(
            "http://127.0.0.1:8000/api/product?available_on_website=True"
        )
        data = {"order": {"date_order": "2022-08-15", "date_takeaway": "2022-08-29"}}
        product_random = random.choice(json.loads(product_response.text))
        data['orderline'] = []
        data['orderline'].append(
            {
                'product_id': product_random["id"],
                'quantity': random.randint(1, 100),
                'price': product_random["price"],
            }
        )
        order = self.client.post("http://127.0.0.1:8000/api/order", json.dumps(data))

        assert order.status_code == 201




