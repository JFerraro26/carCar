from django.urls import path
from .views import technician_list, create_technician, create_appointment

urlpatterns = [
    path('api/technicians/', technician_list, name='technician_list'),
    path('api/technicians/create/', create_technician, name='create_technician'),
    path('api/appointments/', create_appointment, name='create_appointment'),
]
