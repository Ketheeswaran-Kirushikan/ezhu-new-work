import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const CardForm = () => {
  // const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  const { userId } = useParams();
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
  }, [userId]);

  const handleToken = async (token) => {
    console.log("Token received:", token);
    console.log("Selected product:", selectedProduct);

    try {
      const response = await axios.post(
        `${process.env.BACK_END_URL}/Ezhu/userpayment/payment/${userId}`,
        { token, selectedProduct, userId },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      console.log("Subscription response:", data);
    } catch (error) {
      console.error("Error processing Stripe token:", error);
      // Handle the error appropriately, e.g., display an error message to the user
      alert(
        "An error occurred while processing your payment. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Choose Your Subscription
              </h2>
              <div className="d-flex justify-content-around mb-4">
                <button
                  className={`btn btn-primary ${
                    selectedProduct.role === "skilled person" ? "active" : ""
                  }`}
                  onClick={() => setSelectedProduct(products[0])}
                >
                  Skilled Worker
                </button>
                <button
                  className={`btn btn-primary ${
                    selectedProduct.role === "investor" ? "active" : ""
                  }`}
                  onClick={() => setSelectedProduct(products[1])}
                >
                  Investor
                </button>
              </div>
              <StripeCheckout
                stripeKey="pk_test_51PIewdRvFH14lKkrp1Mpmk1Ft0sJi6EEj1YMYEw4SOgKrxN0TjrUhSC7mjTa6B97NM4wQGGopzqNS6xUa7tsJfjn00nfwuoRpd" // Replace with your actual publishable key
                token={handleToken}
                name="Monthly subscription"
                amount={selectedProduct.price * 100} // Amount in cents
                currency="LKR"
              >
                <button className="btn btn-success w-100">
                  Subscribe as {selectedProduct.role}
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
