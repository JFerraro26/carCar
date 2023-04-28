import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO

def get_vin():
    url = "http://project-beta-inventory-api-1:8000/api/automobiles"
    response = requests.get(url)
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            defaults={
                "vin": automobile["vin"]
            }
        )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_vin()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
