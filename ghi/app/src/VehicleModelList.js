import React, { useState, useEffect } from 'react';

function VehicleModelList() {
  const [vehicleModels, setVehicleModels] = useState([]);

  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setVehicleModels(data);
          } else {
            console.error('Error: API response is not an array of vehicle models');
          }
        } else {
          console.error('Error fetching vehicle models:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching vehicle models:', error);
      }
    };

    fetchVehicleModels();
  }, []);

  return (
    <div>
      <h2>Vehicle Models</h2>
      <ul>
        {vehicleModels.map((model) => (
          <li key={model.id}>
            {model.name} - {model.brand}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehicleModelList;
