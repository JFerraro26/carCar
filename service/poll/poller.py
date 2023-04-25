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

def get_vins():
    response = requests.get('http://localhost:8000/api/automobiles/')
    if response.ok:
        data = response.json()
        return [automobile['vin'] for automobile in data]
    else:
        raise ValueError('Error retrieving VINs:', response.status_code)

def poll():
    while True:
        print('Service poller polling for data')
        try:
            vins = get_vins()

            for vin in vins:
                AutomobileVO.objects.update_or_create(vin=vin)
        except Exception as e:
            print('Error polling for VINs:', e, file=sys.stderr)
        time.sleep(60)



if __name__ == "__main__":
    poll()
