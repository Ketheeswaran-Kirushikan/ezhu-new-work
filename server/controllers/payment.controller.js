require("dotenv").config();
const SkilledPersonRequest = require("../models/skillperson.request.model");
const InvestorRequest = require("../models/investor.request.model");
const Payment = require("../models/payment.model");
const {
  verifyUser: verifySkillPersonUser,
} = require("../controllers/skillperson.controller");
const {
  verifyUser: verifyInvestorUser,
} = require("../controllers/investor.controller");
const stripe = require("stripe")(process.env.STRIPE_API_PRIVATE_KEY);

const handlePayment = async (req, res) => {
  const generateTransactionId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  try {
    const { token, selectedProduct, userId } = req.body;
    console.log("Received request with userId:", userId);
    console.log(selectedProduct.role);
    _id = userId;
    let user = null;
    let userModel = null;

    if (selectedProduct.role === "skilled person") {
      userModel = SkilledPersonRequest;
    } else if (selectedProduct.role === "investor") {
      userModel = InvestorRequest;
    } else {
      console.error("Invalid user role:", selectedProduct.role);
      return res.status(400).json({ error: "Invalid user role" });
    }

    user = await userModel.findById(_id);
    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    const transactionId = generateTransactionId();
    const paymentDate = new Date();

    try {
      const charge = await stripe.charges.create({
        amount: selectedProduct.price * 100, // Amount in cents
        currency: "LKR",
        description: selectedProduct.name,
        source: token.id,
      });

      console.log("Payment successful:", charge);
    } catch (stripeError) {
      console.error("Stripe API error:", stripeError);
      return res.status(400).json({ error: stripeError.message });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "payment.status": "succeed",
          "payment.transactionId": transactionId,
          "payment.paymentDate": paymentDate,
        },
      },
      { new: true }
    );

    if (updatedUser.payment.status === "succeed") {
      // Call verifyUser conditionally based on user's role
      if (selectedProduct.role === "skilled person") {
        await verifySkillPersonUser({ params: { _id: updatedUser._id } }, res);
      } else if (selectedProduct.role === "investor") {
        await verifyInvestorUser({ params: { _id: updatedUser._id } }, res);
      }
    }

    const payment = new Payment({
      userId: updatedUser._id,
      amount: selectedProduct.price,
      paymentMethod: "Stripe",
      transactionId: transactionId,
      paymentDate: paymentDate,
      created_by: updatedUser.created_by,
      role: updatedUser.role,
    });

    await payment.save();

    // res.status(200).json({
    //   message: "Payment successful",
    //   transactionId: updatedUser.payment.transactionId,
    // });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handlePayment,
};
