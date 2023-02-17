
import { Routes, Route } from 'react-router-dom';
import Authentication from './pg/auth/Authentication';
import DashBord from './pg/DashBord';


function App() {

  return (

    <Routes>
      <Route path='/auth' element={<Authentication />} />
      <Route path='/dashboard/*' element={<DashBord />} />
    </Routes>


  );
}

export default App;
