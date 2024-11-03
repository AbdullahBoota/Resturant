import React from 'react';
import { useNavigate } from 'react-router-dom';
import specialImage from './Images/pexels-chanwalrus-958545.jpg';  // Note the closing quote
import ambienceImage from './Images/pexels-edwardeyer-687824.jpg'; // Note the closing quote
import serviceImage from './Images/pexels-pixabay-262978.jpg';    // Note the closing quote

export default function Home() {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate('/menu'); // Ye 'Menu' page pe navigate karega
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h1 className="display-4 mb-4">Welcome to Our Restaurant</h1>
          <p className="lead">
            Enjoy a delicious dining experience with our exclusive menu curated by top chefs.
            We offer a range of dishes that cater to all taste buds.
          </p>
          <button className="btn btn-primary btn-lg mt-3" onClick={goToMenu}>
            View Our Menu
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <img src={specialImage} className="card-img-top" alt="Delicious Food" />
            <div className="card-body">
              <h5 className="card-title">Our Specials</h5>
              <p className="card-text">Try our exclusive dishes, only available this season!</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={ambienceImage} className="card-img-top" alt="Restaurant Ambience" />
            <div className="card-body">
              <h5 className="card-title">Beautiful Ambience</h5>
              <p className="card-text">Relax and enjoy your meal in a cozy environment.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={serviceImage} className="card-img-top" alt="Quick Service" />
            <div className="card-body">
              <h5 className="card-title">Quick Service</h5>
              <p className="card-text">Experience prompt and friendly service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
