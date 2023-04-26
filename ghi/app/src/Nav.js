import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/vehicle-models">Vehicle Models</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/create-vehicle-model">Create Vehicle Model</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/manufacturer">Manufacturers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/manufacturer/new">Create Manufacturer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/automobile">Automobiles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/automobile/new">Create Automobile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/salespeople">Salespeople</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/salespeople/new">Add a Salesperson</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/customers">Customers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/customers/new">Add a Customer</NavLink>
              </li>
              <li>
                <NavLink className="nav-link" activeclassname="active" to="/technicians">Technicians</NavLink>
              </li>
              <li>
                <NavLink className="nav-link" activeclassname="active" to="/technicians/create">Add Technician</NavLink>
              </li>
              <li>
                <NavLink className="nav-link" activeclassname="active" to="/appointments/create">Create Appointment</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/sales">Sales</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/sales/new">Add a Sale</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/sales/history">Salesperson History</NavLink>
              </li>
            <li>
              <NavLink className="nav-link" activeclassname="active" to="/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/service-history">Service History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
