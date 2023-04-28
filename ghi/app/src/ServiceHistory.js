import React, { useState, useEffect } from 'react';


function ServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('http://localhost:8080/api/appointments/all/');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
      }
      else {
        console.error(response)
      }

    };
    fetchAppointments();
  }, []);


  const filteredAppointments = appointments.filter(appointment =>
    appointment.vin.toLowerCase().includes(searchValue.toLowerCase())
  );


  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }


  return (
    <div className="container">
      <h2 className="my-4">Service History</h2>
      <div className="form-group">
        <label htmlFor="vin-search">Search by VIN:</label>
        <input type="text" className="form-control" id="vin-search" value={searchValue} onChange={handleSearchChange} />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Purchased</th>
            <th>Customer Name</th>
            <th>Date & Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.vin}</td>
              <td>{appointment.vin.import_href ? 'Yes' : 'No'}</td>
              <td>{appointment.customer}</td>
              <td>{appointment.date_time}</td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status || "Created"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
