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
