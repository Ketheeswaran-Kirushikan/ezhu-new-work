import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
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
  faMoneyBill,
  faSignOutAlt, // Added for logout icon
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import profile from "../../../assets/Group 29.png";
import Card from "../../../components/Admin/card/Card";
import Table from "../../../components/Admin/table/Table";
import InvestorTableData from "../../../components/Admin/table/InvestorTableData";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios";
import backendUrl from "../../../context/Config";

const Dashboard = () => {
  const [skilledCount, setSkilledCount] = useState(0);
  const [investorCount, setInvestorCount] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch skilled worker requests count
    axios
      .get(`${backendUrl}/Ezhu/Skillworker/Request/findSkilledPersonRequest`)
      .then((response) => setSkilledCount(response.data.length))
      .catch((err) => console.log("Error fetching skilled requests:", err));

    // Fetch investor requests count
    axios
      .get(`${backendUrl}/Ezhu/Investor/Request/findInvestorRequest`)
      .then((response) => setInvestorCount(response.data.length))
      .catch((err) => console.log("Error fetching investor requests:", err));
  }, []);

  const handleLogout = () => {
    // Clear authentication data (e.g., token)
    localStorage.removeItem("authToken"); // Adjust based on your auth setup
    // Navigate to homepage
    navigate("/");
  };

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
          <div className="user-wrapper d-flex align-items-center">
            <div>
              <h4 className="text-white me-2">Kirushikan</h4>
            </div>
            <img src={profile} width="40px" height="40px" alt="profile-img" className="me-2" />
            <Button
              icon={faSignOutAlt}
              className="search-button dashboard-icon"
              onClick={handleLogout}
              title="Logout"
            />
          </div>
        </header>

        <main>
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-left text-white">
                {new Date().toDateString()}
              </h1>
            </div>
          </div>

          <div className="row dashboard-card-work">
            <div className="container-fluid">
              <div className="row dashboard-card-container">
                <Card
                  icon={faMoneyBill}
                  title="Today earnings:"
                  value="$500"
                  className="dasboard-moneybill"
                />
                <Card
                  icon={faUser}
                  title="Skilled persons requests:"
                  value={skilledCount}
                  className="dasboard-moneybill"
                />
                <Card
                  icon={faUser}
                  title="Investor requests:"
                  value={investorCount}
                  className="dasboard-moneybill"
                />
                <Card
                  icon={faMoneyBill}
                  title="Total income:"
                  value="$10,000"
                  className="dasboard-moneybill"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-5">
              <h1 className="text-start text-white">
                Skilled persons Requests
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="container-fluid">
              <div className="row">
                <Table />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-5">
              <h1 className="text-start text-white">Investors Requests</h1>
            </div>
          </div>
          <div className="row">
            <div className="container-fluid">
              <div className="row">
                <InvestorTableData />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;