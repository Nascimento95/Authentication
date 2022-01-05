import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from '../src/pages/Login'
import Admin from '../src/pages/Admin'
import Signup from './pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      {/* <Route path="/associations/formulaire" element={<FormMessage/>}/>
      <Route path="/admin" element={<Message/>}/> */}
    </Routes>
</BrowserRouter>
  );
};

export default App;