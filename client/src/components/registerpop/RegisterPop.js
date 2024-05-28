import React from 'react';
import Button from '../button/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './registerpop.css';
import { Link } from 'react-router-dom';

const RegisterPop = ({ isOpen, togglePopup }) => {
  const popupStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    zIndex: '1000',
  };

  return (
    <div style={popupStyle} className='background-register-color-container'>
      <div className='d-flex align-items-center justify-content-center'>
        <div className="centered-register-container">
          <h5 className="register-card-heading-skilledworkers">
            Your registration request has been successfully submitted. We will contact you within 24 hours. Thank you for choosing us!
          </h5>
          <Link to="/" className='Link-tag'>
            <Button className="registerPop-close-Button mb-3" name="close" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPop;

