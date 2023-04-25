from django.shortcuts import render
from .models import AutomobileVO, Salesperson, Customer, Sale
from common.json import ModelEncoder


# Create your views here.
class AutomobileVoEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
        "import_href",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile" : AutomobileVoEncoder(),
        "salesperson" : SalespersonEncoder(),
        "customer" : CustomerEncoder(),
    }
