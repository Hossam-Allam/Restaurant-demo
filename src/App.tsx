// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Customer from './pages/Customer';
import Chef from './pages/Chef';
import Waiter from './pages/Waiter';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/chef" element={<Chef />} />
      <Route path="/waiter" element={<Waiter />} />
    </Routes>
  );
};

export default App;
