import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Current from './pages/Current';
import Weekly from './pages/Weekly';
import Monthly from './pages/Monthly';
import Details from './pages/Details';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/current' element={<Current />} />
          <Route path='/weekly' element={<Weekly />} />
          <Route path='/monthly' element={<Monthly />} />
          <Route path='/details' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;