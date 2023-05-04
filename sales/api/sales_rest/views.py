from django.shortcuts import render
from .models import AutomobileVO, Salesperson, Customer, Sale
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


# Create your views here.
class AutomobileVoEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "import_href",
    ]
    def get_extra_data(self, o):
        return {"sold": o.sold}

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
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


@require_http_methods(["GET", "POST"])
def salesperson_list_or_create(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder= SalespersonEncoder,
            status=200,
        )

    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        if salesperson:
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
                status=200,
            )
        else:
            return JsonResponse({"message":"Could Not Create Salesperson"}, status=400)



@require_http_methods(["DELETE"])
def salesperson_delete_edit_view(request, id):
    if request.method == "DELETE":
        salesperson = Salesperson.objects.filter(id=id)
        if salesperson:
            salesperson.delete()
            return JsonResponse({"message": "deleted"}, status=200)
        else:
            return JsonResponse({"message": "Saleperson Object not present, Unable to delete"}, status=400)


@require_http_methods(["GET", "POST"])
def customer_list_or_create(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            status=200,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        if customer:
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
                status=200,
                )
        else:
            return JsonResponse({"message":"Could Not Create Customer"}, status=400)



@require_http_methods(["DELETE"])
def customer_edit_view_delete(request, id):
    if request.method == "DELETE":
        customer = Customer.objects.filter(id=id)
        if customer:
            customer.delete()
            return JsonResponse({"message": "deleted"}, status=200)
        else:
            return JsonResponse({"message": "Customer Object not present, Unable to delete"}, status=400)


@require_http_methods(["GET", "POST"])
def sale_list_create (request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder= SaleEncoder,
            status=200,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"]=automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile Vin"},
                status= 400,
            )
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"]=salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson ID"},
                status=400,
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer ID"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        if sale:
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        else:
            return JsonResponse({"message":"Could Not Create Sale"}, status=400)



@require_http_methods(["DELETE"])
def sale_delete_edit_view(request, id):
    if request.method == "DELETE":
        sale = Sale.objects.filter(id=id)
        if sale:
            sale.delete()
            return JsonResponse({"message": "deleted"}, status=200)
        else:
            return JsonResponse({"message": "Sale Object not present, Unable to delete"}, status=400)


@require_http_methods("GET")
def available_car_list(request):
    cars = AutomobileVO.objects.filter(sold=False)
    return JsonResponse(
        {"cars": cars},
        encoder=AutomobileVoEncoder,
        )


@require_http_methods("PUT")
def available_cars_update(request, vin):
    data = json.loads(request.body)
    AutomobileVO.objects.filter(vin=vin).update(**data)
    car = AutomobileVO.objects.get(vin=vin)
    return JsonResponse(
        car,
        encoder=AutomobileVoEncoder,
        safe=False,
        status=200,
    )
