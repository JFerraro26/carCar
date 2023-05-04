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
          <ul className="navbar-nav">
            <li className='nav-item dropdown'>
              <NavLink className="nav-link dropdown-toggle" id='inventory' data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">
                Inventory
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-success navbar-success" aria-labelledby="inventory">
                <li><NavLink className="dropdown-item" to="/manufacturer">Manufacturers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturer/new">Create Manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/vehicle-models">Vehicle Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/create-vehicle-model">Create Vehicle Model</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobile">Automobiles</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobile/new">Create Automobile</NavLink></li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <NavLink className="nav-link dropdown-toggle" id='sales' data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">
                Sales
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-success navbar-success" aria-labelledby="sales">
                <li><NavLink className="dropdown-item" to="/salespeople">Salespeople</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespeople/new">Add a Salesperson</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers">Customers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers/new">Add a Customer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales">Sales</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/new">Add a Sale</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/history">Salesperson History</NavLink></li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <NavLink className="nav-link dropdown-toggle" id='service' data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">
                Service
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-success navbar-success" aria-labelledby="service">
                <li><NavLink className="dropdown-item" to="/technicians">Technicians</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians/create">Add Technician</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments">Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/create">Create Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/service-history">Service History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
