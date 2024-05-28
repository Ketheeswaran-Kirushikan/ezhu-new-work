import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./investormanagement.css";
import logo from "../../../assets/file(2).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartLine,
  faTools,
  faSearch,
  faBell,
  faMessage,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import profile from "../../../assets/Group 29.png";
import InvestorTable from "../../../components/Admin/skillworkertable/Investortable";
import { Link } from "react-router-dom";

const investormanagment = () => {
  return (
    <div>
      <input type="checkbox" id="nav-toggle" className="dashboard-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <img src={logo} alt="logo" className="sidebar-logo" />
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/dashboard" className="active">
                <FontAwesomeIcon icon={faChartLine} />
                <span className="sidebar-span">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/skilledworkermanagement" className="">
                <FontAwesomeIcon icon={faUser} />
                <span className="sidebar-span">Skilled worker</span>
              </Link>
            </li>
            <li>
              <Link to="/investormanagement" className="">
                <FontAwesomeIcon icon={faUser} />
                <span className="sidebar-span">Investors</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="">
                <FontAwesomeIcon icon={faTools} />
                <span className="sidebar-span">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <header>
          <label htmlFor="nav-toggle">
            <span>
              <FontAwesomeIcon icon={faBars} className="dashboard-icon" />
            </span>
          </label>
          <h2 className="text-white">Dashboard</h2>
          <div className="search-wrapper">
            <Input
              className="inputTypeSearch"
              placeholder="Search"
              id="Search"
              type="text"
            />
            <Button icon={faSearch} className="search-button dashboard-icon" />
          </div>
          <div className="dashboard-nav-icon">
            <Button icon={faBell} className="search-button dashboard-icon" />
          </div>
          <div className="dashboard-nav-icon">
            <Button icon={faMessage} className="search-button dashboard-icon" />
          </div>
          <div className="user-wrapper">
            <div>
              <h4 className="text-white">Kirushikan</h4>
            </div>
            <img src={profile} width="40px" height="40px" alt="profile-img" />
          </div>
        </header>

        <main>
          <div className="row">
            <div className="col-md-12 mt-5">
              <h1 className="text-start text-white">Skilled worker details</h1>
            </div>
          </div>
          <div className="row">
            <div className="container-fluid">
              <div className="row">
                <InvestorTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default investormanagment;
