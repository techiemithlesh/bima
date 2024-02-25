
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
import PartnerComissionList from './admin/pages/PartnerComissionList';
import PartnerComissionEdit from './admin/pages/PartnerCommissionEdit';
import { Toaster } from 'react-hot-toast';
import GlobalCommissionAdd from './admin/pages/GlobalCommissionAdd';
import GlobalCommissionList from './admin/pages/GlobalCommissionList';
import GlobalCommissionEdit from './admin/pages/GlobalCommissionEdit';
import PolicyEdit from './admin/pages/PolicyEdit';

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      
      <Route path='/admin/partners' element={<PrivateRoute><Partners/></PrivateRoute>} />
      <Route path='/partner/addcommision/:id' element={<PrivateRoute><AddComission/></PrivateRoute>} />
      <Route path='/partner/global/commision/list' element={<PrivateRoute><GlobalCommissionList/></PrivateRoute>} />
      <Route path='/partner/global/commision/add' element={<PrivateRoute><GlobalCommissionAdd/></PrivateRoute>} />
      <Route path='/partner/global/commision/edit/:id' element={<PrivateRoute><GlobalCommissionEdit/></PrivateRoute>} />
      <Route path='/partner/editcommision/:id' element={<PrivateRoute><PartnerComissionEdit/></PrivateRoute>} />
      <Route path='/partner/details/add/' element={<PrivateRoute><PartnerDetailsAdd/></PrivateRoute>} />
      <Route path='/partner/comissions/list/:id' element={<PrivateRoute><PartnerComissionList/></PrivateRoute>} />
      
      <Route path='/policy/list' element={<PrivateRoute><PolicyList/></PrivateRoute>}/>
      <Route path='/policy/add' element={<PrivateRoute><Policy/></PrivateRoute>}/>
      <Route path='/policy/edit/:id' element={<PrivateRoute><PolicyEdit/></PrivateRoute>}/>

    </Routes>
    <Toaster/>
   </Router>
   </>
  );
}

export default App;
