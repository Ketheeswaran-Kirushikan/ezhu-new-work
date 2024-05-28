import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faRocket, faUser, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import './Career.css';

const Career = () => {
  return (
    <section className='career-container' >
      <div className="bg">
        <div className="container" >
          <h1 id='career-section'>Career path</h1>
          <div className="row py-5">
            <div className="col-md-12">
              <div className="main-timeline">
                <div className="timeline">
                  <div className="timeline-content">
                    <div className="timeline-icon">
                      <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <h3 className="title">Register your porfile</h3>
                    <p className="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tellus lorem, et condimentum neque commodo.
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="timeline-content">
                    <div className="timeline-icon">
                      <FontAwesomeIcon icon={faRocket} />
                    </div>
                    <h3 className="title">share your works!..</h3>
                    <p className="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tellus lorem, et condimentum neque commodo.
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="timeline-content">
                    <div className="timeline-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <h3 className="title">Find your needs..</h3> {/* Changed from Java Script */}
                    <p className="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tellus lorem, et condimentum neque commodo.
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="timeline-content">
                    <div className="timeline-icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    <h3 className="title">Start your career</h3>
                    <p className="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tellus lorem, et condimentum neque commodo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
