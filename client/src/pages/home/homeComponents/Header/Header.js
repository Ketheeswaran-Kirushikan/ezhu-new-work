import React, { useState } from 'react';
import './header.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from '../../../../components/button/Button';
import person from '../../../../assets/Group 29.png';
import { Link } from 'react-router-dom';
import SignPop from '../../../../components/signupPop/SignPop'

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <section className='header-container' id='header-section'>
      <div className="container-fluid top mb-5">
        <div className="row vh-100 d-flex align-items-center justify-content-center">
          <div className="col background-text text-center">
            <h1 className='title-head'>Grow to Gether</h1>
            <div className='d-flex align-items-center justify-content-between button-container'>
              <Link to="/login" className='Link-tag'>
                <Button className="homepage-login-Button" name="Log in" />
              </Link>
              <Button className="homepage-signup-Button" name="Sign up" onClick={togglePopup} />
            </div>
          </div>
          <div className="col">
            <img src={person} alt="Logo" className="person-image" />
          </div>
        </div>
      </div>
      <SignPop isOpen={showPopup} togglePopup={togglePopup} />
    </section>
  );
};

export default Header;
