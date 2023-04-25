import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerFormCreate from './ManufacturerForm';
import AutomobileList from './AutomobilesList';
import AutomobileFormCreate from './AutomobileCreate';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/manufacturer'>
            <Route path='' element={<ManufacturersList />} />
            <Route path="new" element={<ManufacturerFormCreate />} />
          </Route>
          <Route path='/automobile'>
            <Route path='' element={<AutomobileList />} />
            <Route path='new' element={<AutomobileFormCreate />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
