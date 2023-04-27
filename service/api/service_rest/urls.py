from django.urls import path
from .views import (
    technician_list,
    create_technician,
    appointment_list,
    create_appointment,
    appointment_search,
    cancel_appointment,
    finish_appointment,
)

urlpatterns = [
    path('api/technicians/', technician_list, name='technician_list'),
    path('api/technicians/create/', create_technician, name='create_technician'),
    path('api/appointments/', appointment_list, name='appointment_list'),
    path('api/appointments/create/', create_appointment, name='create_appointment'),
    path('api/appointments/search/', appointment_search, name='appointment_search'),
    path('api/appointments/<int:id>/cancel/', cancel_appointment, name='cancel_appointment'),
    path('api/appointments/<int:id>/finish/', finish_appointment, name='finish_appointment'),
]
