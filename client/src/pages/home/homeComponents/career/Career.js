import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faRocket,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import "./Career.css";

const Career = () => {
  return (
    <section className="career-container">
      <div className="bg">
        <div className="container">
          <h1 id="career-section">Career Path</h1>
          <div className="row py-5">
            <div className="col-md-12">
              <div className="main-timeline">
                <div className="timeline">
                  <div className="timeline-content">
                    <div className="timeline-icon">
                      <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <h3 className="title">Register Your Profile</h3>
                    <p className="description">
                      Begin your journey with EZHU by registering as a Skilled Worker, Investor, or General User. Set up your profile to showcase your background, expertise, or interests and become part of a growing network focused on collaboration and empowerment.
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="timeline-content">
                    <div className="timeline-icon">
                      <FontAwesomeIcon icon={faRocket} />
                    </div>
                    <h3 className="title">Share Your Work</h3>
                    <p className="description">
                      Upload your projects, services, or business ideas to the EZHU platform. Let the community and potential investors see what you're capable of by showcasing your real-world skills, passion, and creativity.
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="timeline-content">
                    <div className="timeline-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <h3 className="title">Find What You Need</h3>
                    <p className="description">
                      Whether you are seeking investment, collaborators, skilled professionals, or mentorship, EZHU helps connect you with the right people based on community, skills, and shared goals to make your vision a reality.
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="timeline-content">
                    <div className="timeline-icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    <h3 className="title">Start Your Career</h3>
                    <p className="description">
                      With the backing of a supportive network and access to funding, recognition, and resources, launch your career or business through EZHU. Empower yourself and your community by turning potential into progress.
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
