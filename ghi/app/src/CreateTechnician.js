import React, { useState } from 'react';

function CreateTechnician({ onTechnicianCreated }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTechnician = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };

    try {
      const response = await fetch('http://localhost:8080/api/technicians/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTechnician),
      });

      if (response.ok) {
        setFirstName('');
        setLastName('');
        setEmployeeId('');
        if (onTechnicianCreated) {
          onTechnicianCreated();
        }
      } else {
        console.error('Error creating technician:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating technician:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Add a Technician</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name..."
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last name..."
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    placeholder="Employee ID..."
                    value={employeeId}
                    onChange={(event) => setEmployeeId(event.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Technician
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTechnician;
