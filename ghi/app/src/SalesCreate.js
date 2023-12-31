import React, { useEffect, useState } from 'react';

function SalesFormCreate() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.automobile = car;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;
        const saleUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            const carData = {};
            carData.sold = true;
            const carVin = newSale["automobile"].vin;
            const carUrl = `http://localhost:8090/api/cars/${carVin}/`
            const carFetchConfig = {
                method: "put",
                body: JSON.stringify(carData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const automobileVIN =newSale["automobile"].vin;
            const automobileUrl = `http://localhost:8100/api/automobiles/${automobileVIN}/`
            const automobileFetchConfig = {
                method: "put",
                body: JSON.stringify(carData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const automobileResponse = await fetch(automobileUrl, automobileFetchConfig);
            const carResponse = await fetch(carUrl, carFetchConfig);
            if (carResponse.ok && automobileResponse.ok) {
                const updateCars = cars.filter(object => object.vin !== carVin)
                setCars(updateCars)
                setCar("");
                setSalesperson("");
                setCustomer("");
                setPrice("");
            }
            else if (carResponse.ok) {
                const updateCars = cars.filter(object => object.vin !== carVin)
                setCars(updateCars)
                setCar("");
                setSalesperson("");
                setCustomer("");
                setPrice("");
                console.error(automobileResponse)
            }
            else if (automobileResponse.ok) {
                console.error(carResponse)
            }
            else {
                console.error(carResponse)
                console.error(automobileResponse)
            }


        }
        else {
            console.error(response)
        }
    }

    const [cars, setCars] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])
    const [car, setCar] = useState("")
    const [salesperson, setSalesperson] = useState("")
    const [customer, setCustomer] = useState("")
    const [price, setPrice] = useState("")

    const fetchCarData = async () => {
        const response = await fetch("http://localhost:8090/api/cars/")
        if (response.ok) {
            const data = await response.json()
            setCars(data.cars)
        }
        else {
            console.error(response)
        }
    }

    const fetchSalespeopleData = async () => {
        const response = await fetch("http://localhost:8090/api/salespeople/")
        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        }
        else {
            console.error(response)
        }
    }

    const fetchCustomersData = async () => {
        const response = await fetch("http://localhost:8090/api/customers/")
        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
        }
        else {
            console.error(response)
        }
    }

    const handleCarChange = (event) => {
        const value = event.target.value;
        setCar(value)
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value)
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value)
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value)
    }

    useEffect(() => {
        fetchCarData();
        fetchSalespeopleData();
        fetchCustomersData();
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a New Sale</h1>
                    <form onSubmit={handleSubmit}  id="create-new-sale">
                        <div className="mb-3">
                            <label htmlFor="vin">Automobile VIN</label>
                            <select value={car} onChange={handleCarChange} required id="vin" name="vin" className="form-select">
                                <option value="">Choose an automobile VIN...</option>
                                {cars?.map(car => {
                                    return (
                                        <option value={car.vin} key={car.id }>
                                            {car.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salesperson">Salesperson</label>
                            <select value={salesperson} onChange={handleSalespersonChange} required id="salesperson" name="salesperson" className="form-select">
                                <option value="">Choose a salesperson...</option>
                                {salespeople?.map(sper => {
                                    return (
                                        <option value={sper.id} key={sper.id }>
                                            {sper.first_name} {sper.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customer">Customer</label>
                            <select value={customer} onChange={handleCustomerChange} required id="customer" name="customer" className="form-select">
                                <option value="">Choose a customer...</option>
                                {customers?.map(cust => {
                                    return (
                                        <option value={cust.id} key={cust.id }>
                                            {cust.first_name} {cust.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={price} onChange={handlePriceChange} placeholder="Price" required type="number" id="price" name="price" className="form-control"/>
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-outline-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalesFormCreate
