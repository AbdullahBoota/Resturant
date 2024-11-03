// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Form from './component/Form';
import Home from './component/Home';
import MenuManagement from './component/MenuManagement';
import OrderManagement from './component/OrderManagement';
import Footer from './component/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />} {/* Render Navbar only if logged in */}
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Home /> : <Form setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/menu-management" 
          element={isLoggedIn ? <MenuManagement /> : <Form setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/order-management" 
          element={isLoggedIn ? <OrderManagement /> : <Form setIsLoggedIn={setIsLoggedIn} />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
