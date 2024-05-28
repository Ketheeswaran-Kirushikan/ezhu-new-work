const SkilledPersonRequest = require("../models/skillperson.request.model");
const InvestorRequest = require("../models/investor.request.model");
const Payment = require("../models/payment.model");
const { verifyUser } = require("../controllers/skillperson.controller");

const handlePayment = async (req, res) => {
  const generateTransactionId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  try {
    const { token, selectedProduct, userId } = req.body;
    console.log(selectedProduct, userId);

    let UserModel;
    if (selectedProduct.role === "skilled person") {
      UserModel = SkilledPersonRequest;
    } else if (selectedProduct.role === "investor") {
      UserModel = InvestorRequest;
    } else {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const transactionId = generateTransactionId();
    const paymentDate = new Date();

    const updatedUser = await UserModel.findOneAndUpdate(
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
      await verifyUser(req, res);
    }

    const payment = new Payment({
      userId: updatedUser._id,
      amount: selectedProduct.price,
      paymentMethod: "Stripe",
      transactionId: transactionId,
      paymentDate: paymentDate,
      created_by: updatedUser.created_by, // Ensure this field exists and is set correctly
      role: updatedUser.role,
    });

    await payment.save();

    res.status(200).json({
      message: "Payment successful",
      transactionId: updatedUser.payment.transactionId,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handlePayment,
};
