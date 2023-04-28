from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
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


@require_http_methods(["GET"])
def technician_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        if not technicians:
            return JsonResponse({"error": "No technicians found"}, status=404)
        technician_list = [TechnicianEncoder().encode(technician) for technician in technicians]
        return JsonResponse(
            technicians,
            encoder=TechnicianEncoder,
            safe=False,
            status=200
        )
    else:
        return JsonResponse({"error": "Bad request"}, status=400)


@require_http_methods(["POST"])
def create_technician(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if not data:
            return JsonResponse({"error": "Bad request"}, status=400)
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
    else:
        return JsonResponse({"error": "Bad request"}, status=400)


@require_http_methods(["GET"])
def appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.filter(status="Created")
        if not appointments:
            return JsonResponse({"error": "No appointments found"}, status=404)
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
            status=200
        )
    else:
        return JsonResponse({"error": "Bad request"}, status=400)


@require_http_methods(["POST"])
def create_appointment(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if not data:
            return JsonResponse({"error": "Bad request"}, status=400)
        try:
            technician = Technician.objects.get(id=data["technician"])
        except Technician.DoesNotExist:
            return JsonResponse({"error": "Technician not found"}, status=404)
        data["technician"] = technician
        appointment = Appointment.objects.create(**data)

        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
            status=201
        )
    else:
        return JsonResponse({"error": "Bad request"}, status=400)

@require_http_methods(["GET"])
def all_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        if not appointments:
            return JsonResponse({"error": "No appointments found"}, status=404)
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
            status=200
        )
    else:
        return JsonResponse({"error": "Bad request"}, status=400)

@require_http_methods(["GET"])
def appointment_search(request):
    if request.method == "GET":
        vin = request.GET.get('vin', '')
        if vin:
            appointments = Appointment.objects.filter(vin__icontains=vin)
        else:
            appointments = Appointment.objects.all()
        if not appointments:
            return JsonResponse({"error": "No appointments found"}, status=404)
        appointment_list = [json.loads(AppointmentEncoder().encode(appointment)) for appointment in appointments]
        return JsonResponse({"appointments": appointment_list}, safe=False, status=200)
    else:
        return JsonResponse({"error": "Bad request"}, status=400)

@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return JsonResponse({"error": "Appointment not found"}, status=404)
        appointment.status = "Cancelled"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        return JsonResponse({"error": "Bad request"}, status=400)

@require_http_methods(["PUT"])
def finish_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return JsonResponse({"error": "Appointment not found"}, status=404)
        appointment.status = "Finished"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        return JsonResponse({"error": "Bad request"}, status=400)
