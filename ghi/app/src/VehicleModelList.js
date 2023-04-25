import React, { useEffect, useState } from 'react';

function VehicleModelList({ onUpdate }) {
  const [vehicleModels, setVehicleModels] = useState([]);

  useEffect(() => {
    const fetchVehicleModels = async () => {
      const response = await fetch('http://localhost:8100/api/models/');
      const data = await response.json();
      setVehicleModels(data.models);
    };

    fetchVehicleModels();
  }, [onUpdate]);

  return (
    <div className="row">
      <div className="col-12">
        <h2>Vehicle Models</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {vehicleModels && vehicleModels.map((vehicleModel, index) => (
              <tr key={vehicleModel.id} className={index % 2 === 0 ? 'bg-light' : ''}>
                <td>{vehicleModel.name}</td>
                <td>{vehicleModel.manufacturer.name}</td>
                <td><img src={vehicleModel.picture_url} alt={vehicleModel.name} width="100" height="100" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleModelList;
