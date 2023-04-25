import React, { useEffect, useState } from 'react';

function TechnicianList() {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      const response = await fetch('http://localhost:8080/api/technicians/');
      const data = await response.json();
      const technicians = data.technicians.map(tech => JSON.parse(tech));
      setTechnicians(technicians);
    };


    fetchTechnicians();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <h2>Technicians</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {technicians && technicians.map((technician, index) => (
              <tr key={index}>
                <td>{technician.employee_id}</td>
                <td>{technician.first_name} {technician.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default TechnicianList;
