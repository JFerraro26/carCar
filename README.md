# CarCar

Team:

* Miguel Robles - Service
* Joseph Ferraro - Sales microservice

## How to Run this Project

1. Download and install Docker Desktop
2. Open Terminal
3. Fork and Clone Project-Beta from git
4. Run: docker volume create beta-data
5. Run: docker-compose build
6. Run: docker-compose up
7. Open a browser of choice.  Recomended is Google Chrome
8. Go to http://localhost:3000/ in browser

## Design

An applicaton designed to help car dealerships keep track of their available invintory, sales, and services.

![Design](ReadmeDesign.jpg)
## Service microservice



## Sales microservice

There are 4 models in the sales microservice a Salesperson model, a Cutomer model, a AutomobileVO model, and, the reason the microservice was created, a Sales model.  The sales maicroservice polls data from the inventory microservice

### Salesperson model

The Salesperson model takes in  a first name, last name and a unique employee ID.

### Customer model

The Customer model takes in a first name, last name, address and phone number.

### AutomobileVO model

The AutomobileVO model recieves the automobile data from poller.py, pollar.py is polling for data from the Inventory microservice.  The pollar.py file checks if a VIN number that is being polled is already in the AutomobileVO model before creating a new AutomobileVO object.

### Sale model

There is a Sale model that that has a one to many relationship with the AutomobileVO, Salesperson, and Customer models.  It also contains the price that the car sold for.

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

**List Salespeople:** GET request returns JSON:
```
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
**Create a Salesperson:** POST request input JSON:
```
{
		"first_name": "I",
		"last_name": "am",
		"employee_id": "aTest"
}
```
**Delete a Specific Salesperson:** DELETE request returns JSON:
- on successful deletion (status=200)
```
{
	"message": "deleted"
}
```
- else (status=400)
```
{
	"message": "Saleperson Object not present, Unable to delete"
}
```
**List Customer:** GET request returns JSON:
```
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
**Create a Customer:** POST request input JSON:
```
{
	"first_name": "Bob",
	"last_name": "WeHadABabyItsABoy",
	"address": "1234 Fake St.",
	"phone_number": "9999999979"
}
```
**Delete a specific customer:** DELETE request returns JSON:
- on successful deletion (status=200)
```
{
	"message": "deleted"
}
```
- else (status=400)
```
{
	"message": "Customer Object not present, Unable to delete"
}
```
**List Sales** GET request returns JSON:
```
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
**Create a Sale:** POST request input JSON:
```
{
	"automobile": "1HGCT2B88DA000025",
	"salesperson": "2",
	"customer": "2",
	"price": 200
}
```
**Delete a Sale:** DELETE request returns JSON:
- on successful deletion
```
{
	"message": "deleted"
}
```
- else
```
{
	"message": "Sale Object not present, Unable to delete"
}
```
**List Available Cars:** filters AutomobileVO objects by sold: False, GET request returns JSON:
- If cars available (status=200)
```
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
```
{
	"message": "No Available Cars Found"
}
```
**Update Available Car:** updates a specific AutomobileVO object to sold: True on sale submission, PUT request returns JSON:
```
{
	"sold": true
}
```
