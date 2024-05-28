import React from 'react';
import './Footer.css';
import logo from '../../assets/ezhu-high-resolution-logo-transparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="row justify-content-start nav-container">
          <div className="col-3 text-start">
            <div className='logo-container'>
              <img src={logo} alt="Logo" className="logo-image-footer" />
            </div>
          </div>
          <div className="col-9">
            <ul className="navbar-footer">
              <li className="nav-item-footer">
                <a className="nav-link" href="/header">Home</a>
              </li>
              <li className="nav-item-footer">
                <a className="nav-link" href="/career">Career</a>
              </li>
              <li className="nav-item-footer">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item-footer">
                <a className="nav-link" href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row justify-content-end icon-container">
          <div className="col-8">
            <div className="social-icons">
              <a href="#!" className="btn btn-outline-light btn-floating m-1 rounded-circle">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#!" className="btn btn-outline-light btn-floating m-1 rounded-circle">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#!" className="btn btn-outline-light btn-floating m-1 rounded-circle">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#!" className="btn btn-outline-light btn-floating m-1 rounded-circle">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#!" className="btn btn-outline-light btn-floating m-1 rounded-circle">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="#!" className="btn btn-outline-light btn-floating m-1 rounded-circle">
                <FontAwesomeIcon icon={faGithub} />
              </a>

            </div>

          </div>
        </div>
      </div>
      <div className="footer-foot">
        <span className='link-footer'>© 2024 Ezhu. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
