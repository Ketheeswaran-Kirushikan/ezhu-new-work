import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import logo from "../../assets/Payment.jpg";
import "./cardform.css";
import backendUrl from "../../context/Config";

const CardForm = () => {
  const { userId, role } = useParams();
  console.log(role);
  const products = [
    {
      name: "Monthly Subscription for Skilled Workers",
      price: 300,
      productBy: "Ezhu",
      role: "skilled person",
      benefits: [
        "Access to exclusive job postings and opportunities",
        "Enhanced profile visibility to potential investors",
        "Networking events and workshops",
        "Personalized support and resources for skill development",
        "Priority customer support",
      ],
    },
    {
      name: "Monthly Subscription for Investors",
      price: 500,
      productBy: "Ezhu",
      role: "investor",
      benefits: [
        "Access to a pool of highly skilled workers and startups",
        "Detailed profiles and project proposals from potential partners",
        "Invitations to exclusive networking events and pitch sessions",
        "Personalized matchmaking with promising business opportunities",
        "Priority customer support",
      ],
    },
  ];
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  useEffect(() => {
    if (role === "skilled person") {
      setSelectedProduct(products[0]);
    } else if (role === "investor") {
      setSelectedProduct(products[1]);
    }
  }, [role]);

  const handleToken = async (token) => {
    console.log("Token received:", token);
    console.log("Selected product:", selectedProduct);

    try {
      const response = await axios.post(
        `${backendUrl}/Ezhu/userpayment/payment/${userId}`,
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
                    seamless payments on our secure platform.
                  </p>
                </div>
                <div className="d-flex justify-content-around  combo-button">
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
                <div className="card-payment-text-details">
                  <p className="mb-3 text-start">
                    <strong>Subscription: </strong>
                    {selectedProduct.name}
                  </p>
                  <p className="mb-3 text-start">
                    <strong>Price: </strong>
                    {selectedProduct.price} LKR/month
                  </p>
                  <p className="mb-3 text-start">
                    <strong className="mb-3">Benefits: </strong>
                    <ul className="ul-style">
                      {selectedProduct.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </p>
                </div>
                <div>
                  <StripeCheckout
                    stripeKey="pk_test_51PIewdRvFH14lKkrE1UJCLDNE1Bu2AQACOqssEzny1YQqepVYOurBblXVBfzevB6wbMuZO1gvbRRl2iesvdwVRie00rznf1eAN"
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
