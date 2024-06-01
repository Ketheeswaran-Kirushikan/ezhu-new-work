import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import backendUrl from "../../../../context/Config";

const UserDetailsModal = ({ user, onClose }) => {
  const [emailStatus, setEmailStatus] = useState("send mail");

  const notifySuccess = () => {
    toast.success("Your data was saved successfully");
  };
  const notifyError = () => {
    toast.error("Error saving data. Please try again.");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${backendUrl}/Ezhu/skilledworker/createSkilledPerson/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        notifySuccess();
      } else {
        notifyError();
        console.log("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.log("Error creating user:", error);
      notifyError();
    }
  };
  const sendMail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/Ezhu/Skillworker/Request/sendMail/${user._id}`
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
                    <b>Gender</b> {user.gender}
                  </p>
                  <p>
                    <b>Role:</b> {user.role}
                  </p>
                  <p>
                    <b>Skill:</b> {user.skill.join(", ")}
                  </p>
                  <p>
                    <b>District:</b> {user.district}
                  </p>
                  <p>
                    <b>Reference Number:</b> {user.referenceNumbers}
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
      {showModal && <UserDetailsModal user={user} onClose={handleCloseModal} />}
    </>
  );
};

export default UserDetails;
