import React, { useEffect, useState } from 'react';

function SalesPersonHistory() {
    const [sales, setSales] = useState([])
    const [salesData, setSaleData] = useState([])
    const [salespeople, setSalespeople] = useState([])

    const fetchSalesData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/")
        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
            setSaleData(data.sales)
        }
        else{
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

    useEffect(() => {
        fetchSalesData();
        fetchSalespeopleData();
    }, [])

    const handleSalespersonSelect = (event) => {
        const value = event.target.value;
        var updatedSales
        if (value === "all"){
            updatedSales = salesData
        }
        else {
            updatedSales = salesData.filter(obj => obj.salesperson.id === parseFloat(value))
        }
        console.log("function", updatedSales)
        setSales(updatedSales)

    }

    return (
        <>
            <h1>SalesPersonHistory</h1>
            <select onChange={handleSalespersonSelect} required id="salesperson" name="salesperson"className="salesperson select">
                <option value={"all"} key={"all"}> All </option>
                {salespeople?.map(salesperson => {
                    return (
                        <option value={salesperson.id} key={salesperson.id}>
                            {salesperson.first_name + " " + salesperson.last_name}
                        </option>
                    )
                })}
            </select>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {sales?.map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.first_name + " " + sale.salesperson.last_name }</td>
                            <td>{sale.customer.first_name + " " + sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        </>
    )
}

export default SalesPersonHistory
