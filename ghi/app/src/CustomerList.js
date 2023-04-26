import React, { useEffect, useState } from 'react';

function CustomerList() {
    const DeleteButtonClick = async (cust) => {
        const confirm = window.confirm(`Are you sure you want to delete ${cust.first_name} ${cust.last_name}?`);
        if (confirm) {
            const custId = cust.id
            const custUrl = `http://localhost:8090/api/customers/${custId}`;
            const fetchConfig = {method: "delete"};
            const response = await fetch(custUrl, fetchConfig);
            if (response.ok) {
                const updatedCust = customers.filter(item => item.id !== custId);
                setCustomers(updatedCust);
            }
            else {
                console.error(response)
            }

        }
    }

    const [customers, setCustomers] = useState([]);

    const fetchCustomerData = async () => {
        const response = await fetch("http://localhost:8090/api/customers/");
        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
        }
    }

    useEffect(() => {
        fetchCustomerData();
    }, [])

    return (
        <>
            <h1>Customers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map(cust => {
                        return (
                            <tr key={cust.id}>
                            <td>{cust.first_name}</td>
                            <td>{cust.last_name}</td>
                            <td>{cust.phone_number}</td>
                            <td>{cust.address}</td>
                            <td><button onClick={()=>DeleteButtonClick(cust)} type="button" className="btn btn-outline-danger">Delete Customer</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default CustomerList
