import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/file(2).png'; 
import './navbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-md fixed-top">
      <div>
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </a>
      </div>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navContents" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#header-section">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#career-section">Career</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about-section">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact-section">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
