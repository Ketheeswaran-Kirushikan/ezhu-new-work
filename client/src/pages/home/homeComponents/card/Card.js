import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import investors from "../../../../assets/pngwing.com.png";
import skillworker from "../../../../assets/pngwing.com11.png";
import "./Card.css";

const Card = () => {
  return (
    <section className="body-container">
      <div className="container">
        <div className="row vard-gap">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">
                  For <span className="investor">Investor</span>
                </h1>
                <p className="card-title text-center paragraph">
                  EZHU provides a unique opportunity for investors to discover and support high-potential grassroots talent across Sri Lanka. By investing in skilled workers and local entrepreneurs, you become a catalyst for sustainable development and inclusive economic growth. Monitor impact, fund directly, and build strong partnerships that go beyond just profit.
                </p>
              </div>
              <img src={investors} className="card-img-bottom" alt="1" />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">
                  For <span className="skillworker">Skill Workers</span>
                </h1>
                <p className="card-title text-center paragraph">
                  EZHU empowers skilled individuals by giving them a digital space to showcase their talents, connect with supportive investors, and build meaningful careers. Whether you're a carpenter, designer, tailor, or technician, the platform helps you turn your skills into thriving businesses with visibility, funding, and growth opportunities.
                </p>
              </div>
              <img src={skillworker} className="card-img-bottom" alt="2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
