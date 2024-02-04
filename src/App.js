
import './App.css';
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './shared/Login';
import './shared/style.css';
import Dashboard from './admin/pages/Dashboard';
import Partners from './admin/pages/Partners';
import AddComission from './admin/pages/AddCommision';
import PartnerDetails from './admin/pages/PartnerDetails';
import Policy from './admin/pages/Policy';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path='/admin/partners' element={<PrivateRoute><Partners/></PrivateRoute>} />
      <Route path='/partner/addcommision/:id' element={<PrivateRoute><AddComission/></PrivateRoute>} />
      <Route path='/partner/details/add/:id' element={<PrivateRoute><PartnerDetails/></PrivateRoute>} />
      <Route path='/policy/add' element={<Policy/>}/>
    </Routes>
   </Router>
   </>
  );
}

export default App;
