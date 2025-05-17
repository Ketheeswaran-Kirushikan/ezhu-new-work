import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../../../components/input/Input";
import "./skillmodel.css";
import axios from "axios";
import backendUrl from "../../../../context/Config";

const Skillmodel = ({ user, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);

  const notifySuccess = () => {
    toast.success("Your data was updated successfully");
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendUrl}/Ezhu/skilledworker/updateSkilledPerson/${editedUser._id}`,
        editedUser // Send editedUser directly as the body
      );
      if (response.status === 200) {
        notifySuccess();
        onClose();
      } else {
        notifySuccess();

      }
    } catch (error) {
      notifySuccess();

      notifySuccess();

    }
  };

  return (
    <>
      <Modal show={true} onHide={onClose} className="custom-model-content">
        <Modal.Header closeButton>
          <Modal.Title>Skill person Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <form onSubmit={handleSubmit}>
            <div>
              <label>User ID:</label>
              <Input
                type="text"
                defauvalue={editedUser._id}
                readOnly
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>first Name:</label>
              <Input
                type="text"
                name="first_name"
                value={editedUser.first_name}
                onChange={handleInputChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>last Name:</label>
              <Input
                type="text"
                name="last_name"
                value={editedUser.last_name}
                onChange={handleInputChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Email:</label>
              <Input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Number:</label>
              <Input
                type="text"
                name="number"
                value={editedUser.number}
                onChange={handleInputChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Gender:</label>
              <br></br>
              <select
                name="gender"
                value={editedUser.gender}
                onChange={handleInputChange}
                className="inputTypeEdit"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label>Birth Date:</label>
              <Input
                type="date"
                name="birthDate"
                value={editedUser.birthDate}
                onChange={handleInputChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Skill: </label>
              <Input
                type="text"
                name="skill"
                value={editedUser.skill}
                readOnly
                onChange={handleInputChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Role: </label>
              <Input
                type="text"
                name="role"
                value={editedUser.role}
                readOnly
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>National ID:</label>
              <Input
                type="text"
                name="nationalid"
                value={editedUser.nationalid}
                readOnly
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>District:</label>
              <Input
                type="text"
                name="district"
                value={editedUser.district}
                onChange={handleInputChange}
                className="inputTypeEdit"
              />
            </div>
            <p>
              Image:{" "}
              {editedUser.images && (
                <img
                  src={editedUser.images}
                  alt="Design"
                  style={{ width: "100px", height: "auto" }}
                />
              )}
            </p>
            <div>
              <label>Reference Numbers:</label>
              <Input
                type="text"
                name="referenceNumbers"
                value={editedUser.referenceNumbers}
                readOnly
                className="inputTypeEdit"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const UserDetails = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <ToastContainer />
      <Button variant="primary" onClick={handleShowModal} className="me-2">
        <FontAwesomeIcon icon={faPencil} />
      </Button>
      {showModal && <Skillmodel user={user} onClose={handleCloseModal} />}
    </>
  );
};

export default UserDetails;
