import React, { useState, useEffect } from 'react';

function CreateAppointment({ onAppointmentCreated }) {
  const [technicians, setTechnicians] = useState([]);
  const [vin, setVin] = useState('');
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [technician, setTechnician] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchTechnicians = async () => {
      const response = await fetch('http://localhost:8080/api/technicians/');
      const data = await response.json();
      const parsedTechnicians = data.technicians.map(tech => JSON.parse(tech));
      setTechnicians(parsedTechnicians);
    };
    fetchTechnicians();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newAppointment = {
      vin: vin,
      customer: customer,
      date_time: `${date}T${time}`,
      technician: technician,
      reason: reason,
    };

    try {
      const response = await fetch('http://localhost:8080/api/appointments/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        setVin('');
        setCustomer('');
        setDate('');
        setTime('');
        setTechnician('');
        setReason('');
        if (onAppointmentCreated) {
          onAppointmentCreated();
        }
      } else {
        console.error('Error creating appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Create a Service Appointment</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Automobile VIN</label>
                  <input
                    type="text"
                    className="form-control"
                    id="vin"
                    value={vin}
                    onChange={(event) => setVin(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Customer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="customer"
                    value={customer}
                    onChange={(event) => setCustomer(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Technician</label>
                  <select
                    className="form-select"
                    value={technician}
                    onChange={(event) => setTechnician(event.target.value)}
                  >
                    <option value="">Choose a technician...</option>
                    {technicians?.map((tech, index) => (
                      <option key={index} value={tech.id}>
                        {tech.first_name} {tech.last_name} ({tech.employee_id})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointment;
