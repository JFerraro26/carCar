import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

def get_auto():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for auto in content["autos"]:
        current_cars = AutomobileVO.objects.all().values()
        current_car_list_vin = []
        for car in current_cars:
            current_car_list_vin.append(car["vin"])
        if auto["vin"] not in current_car_list_vin:
            AutomobileVO.objects.create(
                sold = auto["sold"],
                vin = auto["vin"],
                import_href = auto["href"],
            )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_auto()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
