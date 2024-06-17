import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import logo from "../../assets/Payment.jpg";
import "./cardform.css";

const CardForm = () => {
  const { userId, role } = useParams();
  const products = [
    {
      name: "Monthly Subscription for Skilled Workers",
      price: 100,
      productBy: "Ezhu",
      role: "skilled person",
    },
    {
      name: "Monthly Subscription for Investors",
      price: 200,
      productBy: "Ezhu",
      role: "investor",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  useEffect(() => {
    console.log("User ID:", userId);
    console.log(userId.role);
  }, [userId]);

  const handleToken = async (token) => {
    console.log("Token received:", token);
    console.log("Selected product:", selectedProduct);

    try {
      const response = await axios.post(
        `http://localhost:3002/Ezhu/userpayment/payment/${userId}`,
        { token, selectedProduct, userId },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      console.log("Subscription response:", data);
    } catch (error) {
      console.error("Error processing Stripe token:", error);
      alert(
        "An error occurred while processing your payment. Please try again."
      );
    }
  };

  return (
    <div className="payment-container">
      <div className="container">
        <div className="row justify-content-center payment-background">
          <div className="col-md-5 card-left">
            <div className="main-payment-card">
              <div className="card-body payment-button">
                <div className="card-payment-text">
                  <h2 className="card-payment-title mb-4">
                    Choose Your Subscription
                  </h2>
                  <p>
                    Unlock your potential with a single click! Experience
                    seamless payments on our secure platform.!..
                  </p>
                </div>
                <div className="d-flex justify-content-around mb-4 combo-button">
                  <button
                    className={`btn payment-button-success ${
                      selectedProduct.role === "skilled person" ? "active" : ""
                    }`}
                    onClick={() => setSelectedProduct(products[0])}
                  >
                    Skilled Worker
                  </button>
                  <button
                    className={`btn payment-button-success ${
                      selectedProduct.role === "investor" ? "active" : ""
                    }`}
                    onClick={() => setSelectedProduct(products[1])}
                  >
                    Investor
                  </button>
                </div>

                <StripeCheckout
                  stripeKey="pk_test_51PIewdRvFH14lKkrp1Mpmk1Ft0sJi6EEj1YMYEw4SOgKrxN0TjrUhSC7mjTa6B97NM4wQGGopzqNS6xUa7tsJfjn00nfwuoRpd"
                  token={handleToken}
                  name="Monthly subscription"
                  amount={selectedProduct.price * 100} // Amount in cents
                  currency="LKR"
                >
                  <button className="btn btn-primary w-100">
                    Subscribe as {selectedProduct.role}
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
          <div className="col-md-7 card-height">
            <img src={logo} alt="Logo" className="payment-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
