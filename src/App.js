
import './App.css';
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './shared/Login';
import './shared/style.css';
import Dashboard from './admin/pages/Dashboard';
import Partners from './admin/pages/Partners';
import AddComission from './admin/pages/AddCommision';

import Policy from './admin/pages/Policy';
import PrivateRoute from './Components/PrivateRoute';
import PolicyList from './admin/pages/PolicyList';
import PartnerDetailsAdd from './admin/pages/PartnerDetailsAdd';

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path='/admin/partners' element={<PrivateRoute><Partners/></PrivateRoute>} />
      <Route path='/partner/addcommision/:id' element={<PrivateRoute><AddComission/></PrivateRoute>} />
      <Route path='/partner/details/add/:id' element={<PrivateRoute><PartnerDetailsAdd/></PrivateRoute>} />
      <Route path='/policy/list' element={<PrivateRoute><PolicyList/></PrivateRoute>}/>
      <Route path='/policy/add' element={<Policy/>}/>
    </Routes>
   </Router>
   </>
  );
}

export default App;
