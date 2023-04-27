import React, { useEffect, useState } from 'react';

function SalespeopleList() {
    const DeleteButtonClick = async (per) => {
        const confirm = window.confirm(`Are you sure you want to delete ${per.first_name} ${per.last_name}?`)
        if (confirm) {
            const perId = per.id;
            const perUrl = `http://localhost:8090/api/salespeople/${perId}`;
            const fetchConfig = {method: "delete"};
            const response = await fetch(perUrl, fetchConfig);
            if (response.ok) {
                const updatedPer = salespeople.filter(item => item.id !== perId);
                setSalespeople(updatedPer);
            }
            else {
                console.error(response)
            }

        }
    }

    const[salespeople, setSalespeople] = useState([]);

    const fetchSalesPeopleData = async () => {
        const response = await fetch("http://localhost:8090/api/salespeople/")
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
        else {
            console.error(response)
        }
    }
    useEffect(() => {
        fetchSalesPeopleData();
    }, [])
    return (
        <>
        <h1>Salespeople</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {salespeople?.map(per => {
                    return (
                        <tr key={per.id}>
                            <td>{per.employee_id}</td>
                            <td>{per.first_name}</td>
                            <td>{per.last_name}</td>
                            <td><button onClick={()=>DeleteButtonClick(per)} type="button" className="btn btn-outline-danger">Delete Salesperson</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
    )
}

export default SalespeopleList
