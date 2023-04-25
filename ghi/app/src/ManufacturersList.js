import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function ManufacturersList() {
    const DeleteButtonClick = async (man) => {
        const confirm = window.confirm(`Are you sure you want to delete ${man.name}?`);
        if (confirm) {
            const manId = man.id
            const manUrl = `http://localhost:8100/api/manufacturers/${manId}`;
            const fetchConfig = {method: "delete"};
            const response = await fetch(manUrl, fetchConfig);
            if (response.ok) {
                const updatedMan = manufacturers.filter(item => item.id !== manId);
                setManufacturers(updatedMan);
            }
            else {
                console.error(response)
            }

        }
    }
    const [manufacturers, setManufacturers] = useState([]);
    const fetchManufactureData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
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
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Add/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>New Manufacturer</td>
                        <td>
                        <Link to="/manufacturer/new" className='btn btn-outline-success'>Add Manufacturer</Link>
                        </td>
                    </tr>
                    {manufacturers?.map(man => {
                        return (
                            <tr key={man.id}>
                               <td>{man.name}</td>
                               <td><button onClick={()=>DeleteButtonClick(man)} type="button" className="btn btn-outline-danger">Delete Manufacturer</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ManufacturersList
