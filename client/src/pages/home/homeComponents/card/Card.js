import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import investors from '../../../../assets/pngwing.com.png';
import skillworker from '../../../../assets/pngwing.com11.png';
import './Card.css';

const Card = () => {
  return (
    <section className="body-container">
      <div className="container">
      <div className="row vard-gap">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">For <span className='investor'>Investor</span></h1>
              <p className="card-title text-center paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <img src={investors} className="card-img-bottom" alt="1" />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">For <span className='skillworker'>Skill workers</span></h1>
              <p className="card-title text-center paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <img src={skillworker} className="card-img-bottom" alt=" 2" />
          </div>
        </div>
      </div>
    </div>
    </section>
    
  );
};

export default Card;
