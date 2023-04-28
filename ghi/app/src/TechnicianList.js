import React, { useEffect, useState } from 'react';

function TechnicianList() {
  const [technicians, setTechnicians] = useState([]);
  useEffect(() => {
    const fetchTechnicians = async () => {
      const response = await fetch('http://localhost:8080/api/technicians/');
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data);
      }
      else {
        console.error(response)
      }

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
            {technicians.map((technician) => (
              <tr key={technician.id}>
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
