import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function AutomobileList() {
    const DeleteButtonClick = async (auto) => {
        const confirm = window.confirm(`Are you sure you want to delete ${auto.model.name}?`);
        if (confirm) {
            const vin = auto.vin
            const manUrl = `http://localhost:8100/api/automobiles/${vin}`;
            const fetchConfig = {method: "delete"};
            const response = await fetch(manUrl, fetchConfig);
            if (response.ok) {
                const updatedAuto = automobiles.filter(item => item.vin !== vin);
                setAutomobiles(updatedAuto);
            }
            else {
                console.error(response)
            }

        }
    }
    const [automobiles, setAutomobiles] = useState([]);
    const fetchManufactureData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
        }
        else {
        console.error(response);
        }
    }
    useEffect(() =>{
        fetchManufactureData();
    }, [])

    return (
        <>
            <h1>Automobiles</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                        <th>Add/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>New Automobile</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>
                        <Link to="/automobile/new" className='btn btn-outline-success'>Add Automobile</Link>
                        </td>
                    </tr>
                    {automobiles?.map(auto => {
                        return (
                            <tr key={auto.id}>
                               <td>{auto.vin}</td>
                               <td>{auto.color}</td>
                               <td>{auto.year}</td>
                               <td>{auto.model.name}</td>
                               <td>{auto.model.manufacturer.name}</td>
                               <td>Boolean Placeholder</td>
                               <td><button onClick={()=>DeleteButtonClick(auto)} type="button" className="btn btn-outline-danger">Delete Automobile</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default AutomobileList
