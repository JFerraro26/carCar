import React, { useState, useEffect } from 'react';

function CreateVehicleModel() {
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
          if (Array.isArray(data)) {
            setManufacturers(data);
          } else {
            console.error('Error: Expected an array of manufacturers, but received:', data);
          }
        } else {
          console.error('Error fetching manufacturers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      }
    };

    fetchManufacturers();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8100/api/models/';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, picture_url: pictureUrl, manufacturer_id: manufacturerId }),
      });

      if (response.ok) {
        const newVehicleModel = await response.json();
        console.log('New vehicle model created:', newVehicleModel);
        setName('');
        setPictureUrl('');
        setManufacturerId('');
      } else {
        console.error('Error creating vehicle model:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating vehicle model:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-header">Create a vehicle model</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Model name..."
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                id="pictureUrl"
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
                className="form-control"
                placeholder="Picture URL..."
              />
            </div>
            <div className="mb-3">
              <select
                id="manufacturerId"
                value={manufacturerId}
                onChange={(e) => setManufacturerId(e.target.value)}
                className="form-select"
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
  );
}

export default CreateVehicleModel;
