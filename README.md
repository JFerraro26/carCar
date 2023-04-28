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

There are 4 models in the sales microservice a *Salesperson* model, a *Cutomer* model, an *AutomobileVO* model, and, the reason the microservice was created, a *Sales* model.  The sales maicroservice polls data from the inventory microservice

### Salesperson model

The *Salesperson* model contains  a first name, last name and a unique employee ID fields.

### Customer model

The *Customer* model contains a first name, last name, address and phone number fields.

### AutomobileVO model

The *AutomobileVO* model contains a vin and sold fields.  It recieves the automobile data from poller.py, pollar.py is polling for data from the Inventory microservice.  The pollar.py file checks if a VIN number that is being polled is already in the *AutomobileVO* model before creating a new *AutomobileVO* object.

### Sale model

There is a *Sale* model that that has a one to many relationship with the *AutomobileVO*, *Salesperson*, and *Customer* models.  It also contains a price field.

## Sales API's

|Action|Method|URL|
|----------|----------|----------|
|List salespeople|GET|http://localhost:8090/api/salespeople/|
|Create a salesperson|POST|http://localhost:8090/api/salespeople/|
|Delete a specific salespeople|DELETE|http://localhost:8090/api/salespeople/:id|
|List customer|GET|http://localhost:8090/api/customers/|
|Create a customer|POST|http://localhost:8090/api/customers/|
|Delete a specific customer|DELETE|http://localhost:8090/api/customers/:id|
|List sales|GET|http://localhost:8090/api/sales/|
|Create a sale|POST|http://localhost:8090/api/sales/|
|Delete a sale|DELETE|http://localhost:8090/api/sales/:id|
|List available cars|GET|http://localhost:8090/api/cars/|
|Update available car|PUT|http://localhost:8090/api/cars/:id|


#### **List Salespeople:**
GET request **RETURNS** JSON:
```json
{
	"salespeople": [
		{
			"id": 1,
			"first_name": "John",
			"last_name": "Denver",
			"employee_id": "jdenver"
		},
		{
			"id": 2,
			"first_name": "Bob",
			"last_name": "WeHadaBabyItsABoy",
			"employee_id": "bboy"
		}
	]
}
```

#### **Create a Salesperson:**
POST request **INPUT** JSON:
```json
{
		"first_name": "I",
		"last_name": "am",
		"employee_id": "aTest"
}
```
POST request **RETURNS** JSON:
```json
{
	"id": 1,
	"first_name": "I",
	"last_name": "am",
	"employee_id": "aTest"
}
```
#### **Delete a Specific Salesperson:**
DELETE request **RETURNS** JSON:
- on successful deletion (status=200)
```json
{
	"message": "deleted"
}
```
- else (status=400)
```json
{
	"message": "Saleperson Object not present, Unable to delete"
}
```
#### **List Customer:**
GET request **RETURNS** JSON:
```json
{
	"customers": [
		{
			"id": 1,
			"first_name": "Dan",
			"last_name": "Man",
			"address": "1234 Fake St",
			"phone_number": "3138675309"
		},
		{
			"id": 2,
			"first_name": "I",
			"last_name": "am    ",
			"address": "a test",
			"phone_number": "1234567890"
		}
	]
}
```
#### **Create a Customer:**
POST request **INPUT** JSON:
```json
{
	"first_name": "Bob",
	"last_name": "WeHadABabyItsABoy",
	"address": "1234 Fake St.",
	"phone_number": "9999999979"
}
```
POST request **RETURNS** JSON:
```json
{
	"id": 1,
	"first_name": "Bob",
	"last_name": "WeHadABabyItsABoy",
	"address": "1234 Fake St.",
	"phone_number": "9999999979"
}
```
#### **Delete a specific customer:**
DELETE request **RETURNS** JSON:
- on successful deletion (status=200)
```json
{
	"message": "deleted"
}
```
- else (status=400)
```json
{
	"message": "Customer Object not present, Unable to delete"
}
```
#### **List Sales**
GET request **RETURNS** JSON:
```json
{
	"sales": [
		{
			"id": 5,
			"automobile": {
				"id": 5,
				"vin": "1LNHM81V87Y600143",
				"sold": true
			},
			"salesperson": {
				"id": 2,
				"first_name": "Dan",
				"last_name": "Bob",
				"employee_id": "dbob"
			},
			"customer": {
				"id": 2,
				"first_name": "Al",
				"last_name": "Capone",
				"address": "Alcatraz",
				"phone_number": "1234567890"
			},
			"price": "1000"
		}
	]
}
```
#### **Create a Sale:**
POST request **INPUT** JSON:
```json
{
	"automobile": "1HGCT2B88DA000025",
	"salesperson": "2",
	"customer": "2",
	"price": 200
}
```
POST request **RETURNS** JSON:
```json
{
	"id": 1,
	"automobile": {
		"id": 2,
		"vin": "1HGCT2B88DA000025",
		"sold": false
	},
	"salesperson": {
		"id": 2,
		"first_name": "Dan",
		"last_name": "Bob",
		"employee_id": "Dbab"
	},
	"customer": {
		"id": 2,
		"first_name": "ada",
		"last_name": "earrrrrrrrrrrr",
		"address": "adaf",
		"phone_number": "1234"
	},
	"price": 200
}
```
- one note: on automobile updating to `sold: true` is handled through the front end using fetch requests.  So when testing in something, in a program like insomnia the `sold` may be `true` or `false`
#### **Delete a Sale:**
DELETE request **RETURNS** JSON:
- on successful deletion (status=200)
```json
{
	"message": "deleted"
}
```
- else (status=400)
```json
{
	"message": "Sale Object not present, Unable to delete"
}
```
#### **List Available Cars:**
filters AutomobileVO objects by sold: False, GET request **RETURNS** JSON:
- If cars available (status=200)
```json
{
	"cars": [
		{
			"id": 2,
			"vin": "1G1ND52JX3M623371",
			"sold": false
		}
	]
}
```
- else (status=400)
```json
{
	"message": "No Available Cars Found"
}
```
#### **Update Available Car:**
updates a specific AutomobileVO object to sold: True on sale submission, PUT **INPUT** returns JSON:
```json
{
	"sold": true
}
```
PUT **RETURN** returns JSON:
```json
{
	"id": 2,
	"vin": "1HGCT2B88DA000025",
	"sold": true
}
```

**All list GET requests will be status=400 if there is no OBJECT in the MODEL**
