from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Appointment, AutomobileVO, Technician
from django.http import JsonResponse
import json
from django.db.models import Q


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer",
        "date_time",
        "reason",
        "technician",
        "status",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


@csrf_exempt
@require_http_methods(["GET"])
def technician_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        technician_list = [TechnicianEncoder().encode(technician) for technician in technicians]
        print(technician_list)
        return JsonResponse(
            technicians,
            encoder=TechnicianEncoder,
            safe=False,
            status=200
    )

@csrf_exempt
@require_http_methods(["POST"])
def create_technician(request):
    data = json.loads(request.body)
    technician = Technician(
        first_name=data['first_name'],
        last_name=data['last_name'],
        employee_id=data['employee_id'],
    )
    technician.save()
    return JsonResponse(
        technician,
        encoder=TechnicianEncoder,
        safe=False,
        status=201
    )

@csrf_exempt
@require_http_methods(["GET"])
def appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments":appointments},
            encoder=AppointmentEncoder,
            safe=False,
            status=200
    )


@csrf_exempt
@require_http_methods(["POST"])
def create_appointment(request):
    data = json.loads(request.body)
    technician = Technician.objects.get(id=data["technician"])
    data["technician"]=technician
    appointment = Appointment.objects.create(**data)

    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
        status=201
    )

@csrf_exempt
@require_http_methods(["GET"])
def appointment_search(request):
    vin = request.GET.get('vin', '')

    if vin:
        appointments = Appointment.objects.filter(Q(vin__vin__icontains=vin))
    else:
        appointments = Appointment.objects.all()

    appointment_list = [json.loads(AppointmentEncoder().encode(appointment)) for appointment in appointments]

    return JsonResponse({"appointments": appointment_list}, safe=False, status=200)

@csrf_exempt
@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "Cancelled"
        appointment.save()
        return JsonResponse(AppointmentEncoder().encode(appointment), safe=False)
    except Appointment.DoesNotExist:
        return JsonResponse({"error": "Appointment not found"}, status=404)


@csrf_exempt
@require_http_methods(["PUT"])
def finish_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "Finished"
        appointment.save()
        return JsonResponse(AppointmentEncoder().encode(appointment), safe=False)
    except Appointment.DoesNotExist:
        return JsonResponse({"error": "Appointment not found"}, status=404)
