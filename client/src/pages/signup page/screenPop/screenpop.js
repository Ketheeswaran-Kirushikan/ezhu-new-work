import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import investors from "../../../assets/pngwing.com.png";
import skillworker from "../../../assets/pngwing.com11.png";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";
import "./screenpop.css";

const ScreenPop = () => {
  return (
    <div className="container mt-4">
      <div className="row screenpop-container">
        <div className="col-md-6">
          <div className="card">
            <img src={investors} className="card-img-top" alt="Card" />
            <div className="card-body">
              <h5 className="card-title">Investors</h5>
              <Link to="/investorNew" className="Link-tag">
                <Button className="homepage-login-Button mb-3" name="Sign up" />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <img src={skillworker} className="card-img-top" alt="Card" />
            <div className="card-body">
              <h5 className="card-title">Skill workers</h5>
              <Link to="/signupNew" className="Link-tag">
                <Button className="homepage-login-Button mb-3" name="Sign up" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenPop;
