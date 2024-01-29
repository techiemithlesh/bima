
import './App.css';
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './shared/Login';
import './shared/style.css';
import Dashboard from './admin/pages/Dashboard';
import Partners from './admin/pages/Partners';
import AddComission from './admin/pages/AddCommision';

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>

      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      <Route path='/admin/partners' element={<Partners/>} />
      <Route path='/partner/addcommision/:id' element={<AddComission/>} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
