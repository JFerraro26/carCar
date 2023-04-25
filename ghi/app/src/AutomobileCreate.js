import React, { useEffect, useState } from 'react';

function AutomobileFormCreate() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.color = color;
        data.year = year;
        data.model_id = model;
        const autoUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {
            const newAuto = await response.json();
            console.log("New:",newAuto);
            setModel("");
            setVin("");
            setYear("");
            setColor("");
        }
        else {
            console.error(response);
        }
    }

    const [models, setModels] = useState([]);
    const [color, setColor]  = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");
    const [model, setModel] = useState("");
    console.log(models)

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const fetchModelData = async () => {
        const response = await fetch("http://localhost:8100/api/models/")
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
        else {
            console.error(response)
        }
    }

    useEffect(() => {
        fetchModelData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a New Automobile</h1>
                    <form onSubmit={handleSubmit} id="create-new-automobile">
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVinChange} placeholder="Vin" required type="text" id="vin" name="vin" className="form-control"/>
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" id="color" name="color" className="form-control"/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={year} onChange={handleYearChange} placeholder="Year" required type="txt" id="year" name="year" className="form-control"/>
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="mb-3">
                            <select value={model} onChange={handleModelChange} required id="model" name="model" className="form-select">
                                <option value="">Choose a Model</option>
                                {models?.map(model => {
                                    return (
                                        <option value={model.id} key={model.id }>
                                            {model.manufacturer.name + "  " + model.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    <button className="btn btn-outline-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AutomobileFormCreate
