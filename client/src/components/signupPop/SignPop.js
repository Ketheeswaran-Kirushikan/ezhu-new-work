import React from "react";
import Button from "../button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signPop.css";
import investors from "../../assets/pngwing.com.png";
import skillworker from "../../assets/pngwing.com11.png";
import { Link } from "react-router-dom";

const SignPop = ({ isOpen, togglePopup }) => {
  const popupStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 0 2000px rgba(236, 243, 249, 0.5)",
    zIndex: "1000",
  };

  return (
    <>
      <div className="blur-background"></div>
      <div style={popupStyle} className="background-color-container">
        <div className="head-popup">
          <h1>Join with us!</h1>
          <button onClick={togglePopup} className="close-button">
            X
          </button>
        </div>

        <div className="d-flex align-items-center">
          <div className="centered-container">
            <div className="custom-card">
              <img src={investors} alt="Investors" className="card-image" />
              <h5 className="card-heading-investors">Investors</h5>
              <Link to="/investorNew" className="Link-tag">
                <Button className="homepage-login-Button mb-3" name="Sign up" />
              </Link>
            </div>
          </div>
          <div className="centered-container">
            <div className="custom-card">
              <img
                src={skillworker}
                alt="Skill Workers"
                className="card-image"
              />
              <h5 className="card-heading-skilledworkers">Skilled workers</h5>
              <Link to="/signupNew" className="Link-tag">
                <Button className="homepage-login-Button mb-3" name="Sign up" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignPop;
