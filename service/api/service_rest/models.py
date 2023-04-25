from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.IntegerField()

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    vin = models.ForeignKey(AutomobileVO, on_delete=models.CASCADE)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
