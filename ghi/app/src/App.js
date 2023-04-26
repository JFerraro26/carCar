import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './VehicleModelList';
import CreateVehicleModel from './CreateVehicleModel';
import ManufacturersList from './ManufacturersList';
import ManufacturerFormCreate from './ManufacturerForm';
import AutomobileList from './AutomobilesList';
import AutomobileFormCreate from './AutomobileCreate';
import TechnicianList from './TechnicianList';
import CreateTechnician from './CreateTechnician';
import CreateAppointment from './CreateAppointment';
import SalespeopleList from './SalespeopleList';
import SalespeopleCreate from './SalesPeopleCreate';
import CustomerList from './CustomerList';
import CustomerCreate from './CustomerCreate';
import SalesList from './SalesList';
import SalesFormCreate from './SalesCreate';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/vehicle-models" element={<VehicleModelList />} />
          <Route path="/create-vehicle-model" element={<CreateVehicleModel />} />
          <Route path='/manufacturer'>
            <Route path='' element={<ManufacturersList />} />
            <Route path="new" element={<ManufacturerFormCreate />} />
          </Route>
          <Route path='/automobile'>
            <Route path='' element={<AutomobileList />} />
            <Route path='new' element={<AutomobileFormCreate />} />
          </Route>
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians/create" element={<CreateTechnician />} />
          <Route path="/appointments/create" element={<CreateAppointment />} />
          <Route path='/salespeople'>
            <Route path='' element={<SalespeopleList />} />
            <Route path='new' element={<SalespeopleCreate />} />
          </Route>
          <Route path='customers'>
            <Route path="" element={<CustomerList />} />
            <Route path="new" element={<CustomerCreate />} />
          </Route>
          <Route path='sales'>
            <Route path='' element={<SalesList />} />
            <Route path='new' element={<SalesFormCreate />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
