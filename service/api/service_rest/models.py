from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.IntegerField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.employee_id})"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.vin


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default="Created")
    vin = models.CharField(max_length=17, unique=True)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
