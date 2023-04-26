import React, { useState, useEffect } from 'react';


function ServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('http://localhost:8080/api/appointments/');
      const data = await response.json();
      setAppointments(data.appointments);
    };
    fetchAppointments();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchAppointments(searchInput);
  };

  const searchAppointments = async (vin) => {
    const response = await fetch(`http://localhost:8080/api/appointments/search/?vin=${vin}`);
    const data = await response.json();
    setAppointments(data.appointments);
  };

  return (
    <div className="container">
      <h2 className="my-4">Service History</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label htmlFor="vin" className="form-label">Search by VIN</label>
          <input
            type="text"
            className="form-control"
            id="vin"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-4">Search</button>
      </form>
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
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.vin?.vin}</td>
              <td>{appointment.vin?.import_href ? 'Yes' : 'No'}</td>
              <td>{appointment.customer}</td>
              <td>{appointment.date_time}</td>
              <td>{appointment.technician?.first_name} {appointment.technician?.last_name}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
