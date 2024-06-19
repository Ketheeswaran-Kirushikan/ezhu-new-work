import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const PaymentPop = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add your payment form or content here */}
        Payment content goes here...
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentPop;
