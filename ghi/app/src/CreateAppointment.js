import React, { useState, useEffect } from 'react';

function CreateAppointment({ onAppointmentCreated }) {
  const [technicians, setTechnicians] = useState([]);
  const [vin, setVin] = useState('');
  const [customer, setCustomer] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [technician, setTechnician] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchTechnicians = async () => {
      const response = await fetch('http://localhost:8080/api/technicians/');
      const data = await response.json();
      setTechnicians(data.technicians);
    };
    fetchTechnicians();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newAppointment = {
      vin: vin,
      customer: customer,
      date_time: dateTime,
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
        setDateTime('');
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
                  <input
                    type="text"
                    className="form-control"
                    id="vin"
                    placeholder="VIN..."
                    value={vin}
                    onChange={(event) => setVin(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="customer"
                    placeholder="Customer name..."
                    value={customer}
                    onChange={(event) => setCustomer(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="dateTime"
                    value={dateTime}
                    onChange={(event) => setDateTime(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    value={technician}
                    onChange={(event) => setTechnician(event.target.value)}
                  >
                    <option value="">Select a technician...</option>
                    {technicians.map((tech) => (
                      <option key={tech.pk} value={tech.pk}>
                        {tech.first_name} {tech.last_name} ({tech.employee_id})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    placeholder="Reason for service..."
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
