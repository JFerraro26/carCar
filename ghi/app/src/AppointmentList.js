import React, { useState, useEffect } from 'react';


function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentResponse = await fetch('http://localhost:8080/api/appointments/');
        const appointmentData = await appointmentResponse.json();

        const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
        const automobileData = await automobileResponse.json();

        const updatedAppointments = appointmentData.appointments.map((appointment) => {
          const automobile = automobileData.autos.find((auto) => auto.vin === appointment.vin);
          if (automobile) {
            appointment.vip = true;
          } else {
            appointment.vip = false;
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (response.ok) {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
      } else {
        console.error('Error canceling appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const finishAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Finished' }),
      });

      if (response.ok) {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
      } else {
        console.error('Error finishing appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error finishing appointment:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Service Appointments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>Date & Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>VIP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            appointment.technician && (
              <tr key={appointment.id}>
                <td>{appointment.vin} {appointment.vin?.import_href ? '(Purchased from dealership)' : ''}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date_time}</td>
                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.vip ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => cancelAppointment(appointment.id)}>
                    Cancel
                  </button>
                  <button className="btn btn-success ms-2" onClick={() => finishAppointment(appointment.id)}>
                    Finish
                  </button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default AppointmentList;
