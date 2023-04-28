# CarCar

Team:

* Miguel Robles - Service
* Joseph Ferraro - Sales microservice

## How to Run this Project

1. Download and install Docker Desktop
2. Open Terminal
3. Fork and Clone Project-Beta from git
4. Run: `docker volume create beta-data`
5. Run: `docker-compose build`
6. Run: `docker-compose up`
7. Open a browser of choice.  Recomended is Google Chrome
8. Go to http://localhost:3000/ in browser

## Design

An applicaton designed to help car dealerships keep track of their available invintory, sales, and services.

![Design](ReadmeDesign.jpg)
___
## Service microservice

There are 3 models in this microservice: *Technician*, *AutomobileVO*, and *Appointment*.
We poll data from the *Automobile* model within the **Inventory microservice** to use in our *AutomobileVO* model in this microservice.

## Technicians
This model stores data on the technicians. The API endpoints here are to view the list of technicians and the form to create a new technician and add it to the list.
### List Technicians
- Method: 'GET'
- URL: 'http://localhost:8080/api/technicians/'

**Response**:
```json
[
	{
		"first_name": "Miguel",
		"last_name": "Robles",
		"employee_id": "mrobles",
		"id": 1
	}
]
```

### Create Technician
- Method: 'POST'
- URL: 'http://localhost:8080/api/technicians/create/'

**JSON body:**
```json
{
	"first_name": "John",
	"last_name": "Doe",
	"employee_id": "jdoe"
}
```

**Response**:
```json
[
  {
    "first_name": "John",
    "last_name": "Doe",
    "employee_id": "jdoe",
    "id": 2
  },
]
```

## Appointments
This model stores data on Service Appointments. The API endpoints here are to view the list of Service appointments and a form to create a new Service appointment.
One thing to note on this list is that if the VIN of a vehicle matches the VIN from a car that was in the Inventory microservice, that customer is granted "VIP" status because that means the vehicle was purchased from their dealership.
### List Appointments
- Method: 'GET'
- URL: 'http://localhost:8080/api/appointments/'

**Response**:
```json
{
	"appointments": [
		{
			"id": 4,
			"vin": "1G8ZH52881Z281312",
			"customer": "Mike Hawk",
			"date_time": "2023-04-27T06:00:00+00:00",
			"reason": "Low on Blinker Fluid",
			"technician": {
				"first_name": "Juan",
				"last_name": "Robles",
				"employee_id": "jrobles",
				"id": 2
			},
			"status": "Created"
		}
	]
}
```

### Create Appointment
- Method: 'POST'
- URL: 'http://localhost:8080/api/appointments/create/'

**JSON body:**
```json
{
  "vin": "5NPEU46F26H025085",
  "customer": "Marvin Oldboy",
  "date_time": "2023-05-01T14:30:00",
  "reason": "Tire Change",
  "technician": 1
}
```

**Response**:
```json
{
	"id": 5,
	"vin": "5NPEU46F26H025085",
	"customer": "Marvin Oldboy",
	"date_time": "2023-05-01T14:30:00",
	"reason": "Tire Change",
	"technician": {
		"first_name": "Miguel",
		"last_name": "Robles",
		"employee_id": "mrobles",
		"id": 1
	},
	"status": "Created"
}
```

### Set appointment status to canceled
- Method: 'POST'
- URL: 'http://localhost:8080/api/appointments/:id/cancel'

This will set an appointment's status to *Canceled*, therefore removing it from the list of appointments.

### Set appointment status to finished
- Method: 'POST'
- URL: 'http://localhost:8080/api/appointments/:id/finish'

This will set an appointment's status to *Finished*, therefore removing it from the list of appointments.

## AutomobileVO
This model polls data from the Inventory microservice's Automobile model, specifically the VIN field.
We need their VIN data to compare to this microservice's VIN data when an appointment is created to determine whether or not the customer is granted VIP status.

## Service History
- Method: 'GET'
- URL: 'http://localhost:8080/api/appointments/all/

This API endpoint takes you to the Service History page which lists all of the appointments that are currently active, and those that have been completed via *Finished* or *Canceled*.
If an appointment is still active in the service appointments list, this page will default the status of that appointment to *Created*.
___
## Sales microservice

There are 4 models in the sales microservice a Salesperson model, a Cutomer model, a AutomobileVO model, and, the reason the microservice was created, a Sales model.  The sales maicroservice polls data from the inventory microservice

### Salesperson model

first name, last name and a unique employee ID.

### Customer model

There is a Customer model that takes in a first name, last name, address and phone number.

### AutomobileVO model

There is a AutomobileVO model that polls for automobile data from the Inventory microservice.  The AutomobileVO model takes in more data then is currently being used,
incase of a need to refernce more data when working on future stretch goals.  The pollar.py file checks if a VIN number that is being polled is already in the AutomobileVO model before creating a new model.

### Sale model

There is a Sale model that that has a ForeignKey relationship with the AutomobileVO, Salesperson, and Customer models.  It also contains the price that the car sold for.

## Sales API's

|Action|Method|URL|
|----------|----------|----------|
|List salespeople|GET|http://localhost:8090/api/salespeople/|
|Create a salespeople|POST|http://localhost:8090/api/salespeople/|
|Delete a specific salespeople|DELETE|http://localhost:8090/api/salespeople/:id|
|List customer|GET|http://localhost:8090/api/customers/|
|Create a customer|POST|http://localhost:8090/api/customers/|
|Delete a specific customer|DELETE|http://localhost:8090/api/customers/:id|
|List sales|GET|http://localhost:8090/api/sales/|
|Create a sale|POST|http://localhost:8090/api/sales/|
|Delete a sale|DELETE|http://localhost:8090/api/sales/:id|
|List available cars|GET|http://localhost:8090/api/cars/|
|Update available car|PUT|http://localhost:8090/api/cars/:id|
