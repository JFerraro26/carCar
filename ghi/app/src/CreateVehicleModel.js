import React, { useState, useEffect } from 'react';

function CreateVehicleModel({ onModelCreated }) {
  const [name, setName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
          const data = await response.json();
          setManufacturers(data.manufacturers);
        } else {
          console.error('Error fetching manufacturers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      }
    };
    fetchManufacturers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVehicleModel = {
      name,
      picture_url: pictureUrl,
      manufacturer_id: manufacturerId,
    };

    try {
      const response = await fetch('http://localhost:8100/api/models/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVehicleModel),
      });

      if (response.ok) {
        setName('');
        setPictureUrl('');
        setManufacturerId('');
        if (onModelCreated) {
          onModelCreated();
        }
      } else {
        console.error('Error creating vehicle model:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating vehicle model:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Create a Vehicle Model</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Model Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Model name..."
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pictureUrl" className="form-label">Picture URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pictureUrl"
                    placeholder="Picture URL..."
                    value={pictureUrl}
                    onChange={(event) => setPictureUrl(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="manufacturerId" className="form-label">Manufacturer</label>
                  <select
                    className="form-select"
                    id="manufacturerId"
                    value={manufacturerId}
                    onChange={(event) => setManufacturerId(event.target.value)}
                  >
                    <option value="">Choose a manufacturer...</option>
                    {manufacturers.map((manufacturer) => (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Vehicle Model
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateVehicleModel;
