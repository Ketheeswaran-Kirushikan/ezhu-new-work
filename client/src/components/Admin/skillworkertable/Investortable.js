import React, { useState, useEffect } from "react";
import "./skilledtable.css";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Investormodel from "../../../pages/admin.pages/detail.view/investormodel/Investoredit";
import CreateInvestorModel from "../../../pages/admin.pages/detail.view/investormodel/createInvestor/CreateInvestorModel";
import InvestorCloseModal from "../closeModel/InvestorCloseModal";
import backendUrl from "../../../context/Config";

const InvestorTable = () => {
  const [skilledPersons, setSkilledPersons] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentState, setCurrentState] = useState(1);
  const itemPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${backendUrl}/Ezhu/Investor/findInvestorPerson`)
      .then((response) => setSkilledPersons(response.data))
      .catch((err) => console.log(err));
  };
  const handlePageChange = (page) => {
    setCurrentState(page);
  };

  const indexOfFirstItem = (currentState - 1) * itemPerPage;
  const indexOfLastItem = indexOfFirstItem + itemPerPage;
  const currentItems = skilledPersons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(skilledPersons.length / itemPerPage);
  return (
    <div className="user-management-container">
      <div className="user-management-table">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row align-items-center">
              <div className="col-sm-5">
                <h2>
                  User <b>Management</b>
                </h2>
              </div>
              <div className="col-sm-7 text-end">
                <CreateInvestorModel
                  user={selectedUser}
                  onClose={() => setSelectedUser(null)}
                />
                <Button variant="secondary" className="ms-2 plus-button">
                  <FontAwesomeIcon icon={faFileExport} />
                  <span className="ms-1">Export details</span>
                </Button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover user-management-table-body">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Location</th>
                <th>NIC</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {skilledPersons.map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{item._id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.district}</td>
                  <td>{item.nationalid}</td>
                  <td className="table-button">
                    <Investormodel
                      user={item}
                      onClose={() => setSelectedUser(null)}
                    />
                    <InvestorCloseModal
                      user={item}
                      onClose={() => setSelectedUser(null)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text">
              Showing <b>{currentItems.length}</b> of the{""}
              <b>{skilledPersons.length}</b>entries
            </div>
            <ul className="pagination">
              <li
                className={`page-item${currentState === 1 ? " disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentState === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page=link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentState === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentState + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorTable;
