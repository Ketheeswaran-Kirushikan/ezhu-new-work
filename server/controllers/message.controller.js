const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const Investor = require("../models/investors.model");
const SkilledWorkerModel = require("../models/skillperson.model");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { _id: receiver_id } = req.params;
    const senderId = req.user._id.toString();

    if (!receiver_id) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    const participants = [...new Set([senderId, receiver_id])];

    // Check for Existing Conversation
    let conversation = await Conversation.findOne({
      participants: { $all: participants },
    });

    // Create Conversation (if needed)
    if (!conversation) {
      conversation = new Conversation({
        participants,
        messages: [],
      });
      await conversation.save();
    }

    // Update Conversation (if existing)
    const updatedConversation = await Conversation.findOneAndUpdate(
      { _id: conversation._id },
      {
        $push: {
          messages: {
            sender_id: senderId,
            receiver_id,
            message,
            sender_role: req.user.role,
          },
        },
      },
      { new: true }
    );

    // Get the Receiver's Role
    let receiver = await Investor.findById(receiver_id);
    if (!receiver) {
      receiver = await SkilledWorkerModel.findById(receiver_id);
    }

    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    const newMessage = new Message({
      sender_id: senderId,
      receiver_id,
      message,
      sender_role: req.user.role,
      receiver_role: receiver.role,
    });

    await newMessage.save();

    // Get the receiver's socket ID
    const receiverSocketId = getReciverSocketId(receiver_id);
    if (receiverSocketId) {
      // Emit the new message to the receiver's socket
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("Error in sending Message controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const { _id: userToChatId } = req.params;
    const senderId = req.user._id.toString();

    if (!userToChatId) {
      return res.status(400).json({ error: "User to chat ID is required" });
    }

    const participants = [senderId, userToChatId];

    const conversation = await Conversation.findOne({
      participants: { $all: participants },
    }).populate("messages.sender_id messages.receiver_id");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getting Message controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersWithConversations = async (req, res) => {
  try {
    const senderId = req.user._id.toString();
    const conversations = await Conversation.find({
      participants: senderId,
    });

    const userIds = new Set();
    conversations.forEach((conversation) => {
      conversation.participants.forEach((participantId) => {
        if (participantId.toString() !== senderId) {
          userIds.add(participantId.toString()); // Ensure string conversion
        }
      });
    });

    const userIdsArray = Array.from(userIds);
    const foundUsers = [];

    for (const userId of userIdsArray) {
      let user = null;

      user = await Investor.findById(userId);
      if (!user) {
        user = await SkilledWorkerModel.findById(userId);
      }

      if (user) {
        // Check if user already exists in foundUsers array based on _id
        const existingUser = foundUsers.find((u) => u._id.equals(user._id));
        if (!existingUser) {
          foundUsers.push({
            _id: user._id,
            user_name: user.user_name,
            images: user.images,
            role: user.role,
          });
        }
      }
    }

    return res.status(200).json(foundUsers);
  } catch (error) {
    console.log("Error in getting users with conversations:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessage,
  getUsersWithConversations,
};
