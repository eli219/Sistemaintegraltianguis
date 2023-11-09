
import React from 'react';
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import Login from '../containers/Home/Login/login';
import Empresa from '../containers/Home/Empresa/empresa';
import Comerciantes from '../containers/Home/Comerciantes/comerciantes';
import Home from '../containers/Home/Home';
import Configuracion from '../containers/Home/Configuracion/configuracion';

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/comerciantes" element={<Comerciantes />} />
        <Route path="/configuracion" element={<Configuracion/>}/>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
