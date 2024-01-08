import React, { useEffect } from 'react';
import {
  useLocation
} from 'react-router-dom';
import { useRoutes,Route,Routes } from "react-router-dom";
import './css/style.css';

import './charts/ChartjsConfig';

import Dashboard from './pages/Dashboard';

import RegisterAndLogin from './pages/Registers';
import Login123 from './partials/Login/Login';
import Analysis from './pages/Analysis';
import UserDash from './pages/Userdash'
import Allone from './pages/WethTable';
import LineGraph from './prediction/linegraphs';
import Allgraph from './pages/allgrapgh';
import Userdash from './pages/Userdash'
import Userdatas from './partials/Login/Userdata';
import Emplist from './pages/emplist';
//import Ntable from './partials/Login/wetherdata'

function App() {
  return(
    <Routes>
    <Route path="/admin-dashboard" element={<Dashboard/>} />
    <Route path="/register" element={<RegisterAndLogin/>} />
    <Route path="/" element={<Login123/>} />
    <Route path="/allgraph" element={<Allgraph/>} />
    <Route path="/Prediction" element={<Analysis/>} />
    <Route path="/Dashboard" element={<UserDash/>} />
    <Route path="/list" element={<Allone/>} />
    <Route path="/graph" element={<LineGraph/>} />
    <Route path="/userlist" element={<Emplist/>} />

  </Routes>
  )

}

export default App;
