import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./investorView.css";
import backendUrl from "../../../../context/Config";
const InvestorDetailModel = ({ user, onClose }) => {
  const [emailStatus, setEmailStatus] = useState("send mail");

  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${backendUrl}/Ezhu/Investor/createInvestorPerson/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        notifySuccess("Your data was saved successfully");
      } else {
        notifyError("Error saving data. Please try again.");
        console.log("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.log("Error creating user:", error);
      notifyError("Error saving data. Please try again.");
    }
  };

  const sendMail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/Ezhu/Investor/Request/sendMail/${user._id}`
      );

      if (response.status === 200) {
        notifySuccess(response.data.message);
        setEmailStatus("pending");
      } else {
        notifyError(response.data.error || "Failed to send mail.");
      }
    } catch (error) {
      console.error("Error sending mail:", error);
      notifyError("Failed to send mail. Please try again.");
    }
  };

  return (
    <>
      <Modal
        className="investorDetailView-modal-content"
        show={true}
        onHide={onClose}
      >
        <Modal.Header className="investorDetailView-modal-header" closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="investorDetailView-modal-body">
          <Modal.Body className="investorDetailView-modal-body">
            <Modal.Body className="investorDetailView-modal-body">
              <div className="investorDetailView-user-details-grid">
                <div className="left-column">
                  <p>
                    <b>User ID:</b> {user._id}
                  </p>
                  <p>
                    <b>User Name:</b> {user.first_name} {user.last_name}
                  </p>
                  <p>
                    <b>Email:</b> {user.email}
                  </p>
                  <p>
                    <b>Number:</b> {user.number}
                  </p>
                  <p>
                    <b>Birth Date:</b>{" "}
                    {new Date(user.birthDate).toLocaleDateString()}
                  </p>
                  <p>
                    <b>National ID:</b> {user.nationalid}
                  </p>
                  <p>
                    <b>District:</b> {user.district}
                  </p>
                  <p>
                    <b>Company Name:</b> {user.companyName}
                  </p>
                  <p>
                    <b>Registration Number:</b> {user.registrationNumber}
                  </p>
                  <p>
                    <b>Role:</b> {user.role}
                  </p>
                  <p>
                    <b>Created At:</b>{" "}
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <b>Payment:</b> {user.payment.status}
                  </p>
                </div>
                <div className="right-column">
                  {user.images && <img src={user.images} alt="Design" />}
                </div>
              </div>
            </Modal.Body>
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer className="investorDetailView-modal-footer">
          <Button className="btn-success" onClick={sendMail}>
            {emailStatus === "pending" ? "Pending" : "Send Mail"}
          </Button>
          <Button className="btn-primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button className="investorDetailView btn-danger" onClick={onClose}>
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
        <FontAwesomeIcon icon={faEye} />
      </Button>
      {showModal && (
        <InvestorDetailModel user={user} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UserDetails;
