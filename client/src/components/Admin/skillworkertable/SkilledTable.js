import React, { useState, useEffect } from "react";
import "./skilledtable.css";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Skillmodel from "../../../pages/admin.pages/detail.view/skilledmodel/Skillmodel";
import CreateSkillModel from "../../../pages/admin.pages/detail.view/skilledmodel/createSkillmodel/CreateSkillModel";
import CloseModal from "../closeModel/CloseModal";
import backendUrl from "../../../context/Config";

const SkilledTable = () => {
  const [skilledPersons, setSkilledPersons] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${process.env.BACK_END_URL}/Ezhu/skilledworker/findSkilledPerson`)
      .then((response) => setSkilledPersons(response.data))
      .catch((err) => console.log(err));
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`${backendUrl}/Ezhu/skilledworker/deleteSkilledPerson/${userId}`)
      .then(() => {
        setSelectedUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                <CreateSkillModel
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
                    <Skillmodel
                      user={item}
                      onClose={() => setSelectedUser(null)}
                    />
                    <CloseModal
                      user={item}
                      onClose={(e) => setSelectedUser(null)}
                      onDelete={(e) => handleDeleteUser(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text">
              Showing <b>{skilledPersons.length}</b> entries
            </div>
            <ul className="pagination">
              <li className="page-item disabled">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkilledTable;
