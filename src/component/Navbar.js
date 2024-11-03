// src/component/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsLoggedIn(false); 
    navigate('/'); 
  };

  const goToMenuManagement = () => {
    navigate('/menu-management'); 
  };

  const goToOrderManagement = () => {
    navigate('/order-management'); // Navigate to Order Management
  };

  const goToHome = () => {
    navigate('/'); // Navigate to Home
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={goToHome}>Navbar</a> {/* Make Navbar brand clickable */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link btn" onClick={goToHome}> {/* Use button for Home navigation */}
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={goToMenuManagement}>
                Menu Management
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={goToOrderManagement}>
                Order Management
              </button>
            </li>
          </ul>
          <button className="btn btn-primary" onClick={handleLoginClick}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
