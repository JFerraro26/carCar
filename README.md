# CarCar

Team:

* Miguel Robles - Service
* Joseph Ferraro - Sales microservice

## Design

## Service microservice



## Sales microservice

There are 4 models in the sales micro service a Salesperson model that takes in a first name, last name and a unique employee ID.

There is a Customer model that takes in a first name, last name, address and phone number.

There is a AutomobileVO model that polls for automobile data from the Invintory microservice.  The AutomobileVO model takes in more data then is currently being used,
incase of a need to refernce more data when working on future stretch goals.  The pollar.py file checks if a VIN number that is being polled is already in the AutomobileVO model before creating a new model.

There is a Sale model that that has a ForeignKey relationship with the AutomobileVO, Salesperson, and Customer models.  It also contains the price that the car sold for.
