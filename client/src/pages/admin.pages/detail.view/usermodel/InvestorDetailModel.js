import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import backendUrl from "../../../../context/Config";

const InvestorDetailModel = ({ user, onClose }) => {
  const [emailStatus, setEmailStatus] = useState("send mail");
  const [paymentStatus, setPaymentStatus] = useState("");

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

  const userId=user._id;
  const sendMail = async () => {
    try {
      const response = await axios.post(`${backendUrl}/Ezhu/Investor/sendMail/${userId}`);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/Ezhu/userpayment/payment/success`);
        const data = await response.json();
        console.log("Additional data fetched:", data);
        if (data.message === "Payment successful") {
          setPaymentStatus("Payment Successful");
        }
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };
    if (emailStatus === "pending") {
      fetchData();
    }
  }, [emailStatus]);

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>User ID: {user._id}</p>
          <p>
            User Name: {user.first_name} {user.last_name}
          </p>
          <p>Email: {user.email}</p>
          <p>Number: {user.number}</p>
          <p>Birth Date: {new Date(user.birthDate).toLocaleDateString()}</p>
          <p>National ID: {user.nationalid}</p>
          <p>District: {user.district}</p>
          <p>Company Name: {user.companyName}</p>
          <p>Registration Number: {user.registrationNumber}</p>
          <p>Role: {user.role}</p>
          <p>
            Image:{" "}
            {user.images && (
              <img
                src={user.images}
                alt="Design"
                style={{ width: "100px", height: "auto" }}
              />
            )}
          </p>
          <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => sendMail(user._id)}>
            {emailStatus === "waiting for payment" ? paymentStatus : emailStatus}
          </Button>
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
        <FontAwesomeIcon icon={faEye} />
      </Button>
      {showModal && (
        <InvestorDetailModel user={user} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UserDetails;
