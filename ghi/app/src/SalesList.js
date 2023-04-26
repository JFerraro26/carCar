import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([])

    const fetchSaleData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/")
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
        else {
            console.error(response)
        }
    }

    useEffect(() => {
        fetchSaleData();
    }, [])

    return (
        <>
            <h1>Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Price</th>
                    </tr>
                </thead>
                {/* did not add a delete button on this table because a sale should not be deleted, I may add an edit button as a stretch goal */}
                <tbody>
                    {sales?.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.employee_id}</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default SalesList
