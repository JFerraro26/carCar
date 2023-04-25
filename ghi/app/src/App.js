import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './VehicleModelList';
import CreateVehicleModel from './CreateVehicleModel';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/vehicle-models" element={<VehicleModelList />} />
          <Route path="/create-vehicle-model" element={<CreateVehicleModel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
