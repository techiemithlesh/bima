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
import GlobalCommissionList from './admin/pages/GlobalCommissionList';
import GlobalCommissionAdd from './admin/pages/GlobalCommissionAdd';
import GlobalCommissionEdit from './admin/pages/GlobalCommissionEdit';
import PolicyEdit from './admin/pages/PolicyEdit';
import {Toaster} from "react-hot-toast";
import PartnerDetailsEdit from './admin/pages/PartnerDetailsEdit';
import PolicyAdd from './admin/pages/PolicyAdd';

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      
      <Route path='/admin/partners' element={<PrivateRoute><Partners/></PrivateRoute>} />
      <Route path='/partner/addcommision/:id' element={<PrivateRoute><AddComission/></PrivateRoute>} />
      <Route path='/partner/editcommision/:id' element={<PrivateRoute><PartnerComissionEdit/></PrivateRoute>} />
      <Route path='/partner/details/add/' element={<PrivateRoute><PartnerDetailsAdd/></PrivateRoute>} />
      <Route path='/partner/details/edit/:id' element={<PrivateRoute><PartnerDetailsEdit/></PrivateRoute>} />
      <Route path='/partner/comissions/list/:id' element={<PrivateRoute><PartnerComissionList/></PrivateRoute>} />

        <Route path='/global/commision/list' element={<PrivateRoute><GlobalCommissionList/></PrivateRoute>} />
        <Route path='/global/commision/add' element={<PrivateRoute><GlobalCommissionAdd/></PrivateRoute>} />
        <Route path='/global/commision/edit/:id' element={<PrivateRoute><GlobalCommissionEdit/></PrivateRoute>} />

      <Route path='/policy/list' element={<PrivateRoute><PolicyList/></PrivateRoute>}/>
      {/* <Route path='/policy/add' element={<Policy/>}/> */}
      <Route path='/policy/add/' element={<PolicyAdd/>}/>
      <Route path='/policy/edit/:id' element={<PrivateRoute><PolicyEdit/></PrivateRoute>}/>

    </Routes>
   </Router>
       <Toaster/>
   </>
  );
}

export default App;
