const mongoose = require("mongoose");
const Skilledperson = require("../models/skillperson.model");
const Investor = require("../models/investors.model");
const Conversation = require("../models/conversation.model");

const createFollowers = async (req, res) => {
  try {
    const { id, userid } = req.params;

    if (!id || !userid) {
      return res
        .status(400)
        .json({ error: "Both user ID and follower ID are required" });
    }

    // Fetch the user who is sending the follow request
    let user =
      (await Skilledperson.findById(id)) || (await Investor.findById(id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure all users have the sendFollowRequest attribute
    await Skilledperson.updateMany(
      {},
      { $set: { sendFollowRequest: [] } },
      { upsert: true }
    );
    await Investor.updateMany(
      {},
      { $set: { sendFollowRequest: [] } },
      { upsert: true }
    );

    if (!user.sendFollowRequest || !Array.isArray(user.sendFollowRequest)) {
      user.sendFollowRequest = [];
    }

    if (!user.sendFollowRequest.includes(userid)) {
      user.sendFollowRequest.push(userid);
      await user.save();

      let userToFollow =
        (await Skilledperson.findById(userid)) ||
        (await Investor.findById(userid));
      if (!userToFollow) {
        return res.status(404).json({ error: "Follower not found" });
      }
      userToFollow.followRequest.push(id);
      await userToFollow.save();

      res.status(200).json({ message: "Follow request sent successfully" });
    } else {
      res.status(400).json({ message: "Follow request already sent" });
    }
  } catch (err) {
    console.log("Error handling follow request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const findUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user =
      (await Skilledperson.findById(id)) || (await Investor.findById(id));

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const followersDetails = [];
    const unfollowedUsers = [];
    const skilledWorkers = await Skilledperson.find();
    const investors = await Investor.find();
    const allUsers = [...skilledWorkers, ...investors];
    const followArray = [
      ...(user.followRequest || []),
      ...(user.followers || []),
      ...(user.sendFollowRequest || []),
    ];
    followArray.push(id);
    console.log(followArray);
    for (const followId of followArray) {
      const follower = allUsers.find(
        (user) => user._id.toString() === followId.toString()
      );
      if (follower) {
        followersDetails.push(follower);
      }
    }

    for (const user of allUsers) {
      if (!followArray.includes(user._id.toString())) {
        unfollowedUsers.push(user);
      }
    }

    // console.log("Followers details:", followersDetails);
    // console.log("Unfollowed users:", unfollowedUsers);

    res.status(200).json({ unfollowedUsers });
  } catch (error) {
    console.error("Error caught:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changeFollowers = async (req, res) => {
  const { id, userid } = req.params;

  try {
    let user = await Skilledperson.findById(id);
    if (!user) {
      user = await Investor.findById(id);
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.followers.includes(userid)) {
      return res.status(400).json({ error: "User is already a follower" });
    }

    if (!user.followRequest.includes(userid)) {
      return res
        .status(400)
        .json({ error: "User is not in the follow requests" });
    }
    user.followers.push(userid);
    user.followRequest = user.followRequest.filter(
      (requestId) => requestId.toString() !== userid
    );
    await user.save();
    const newConversation = new Conversation({
      participants: [id, userid],
      messages: [],
    });
    await newConversation.save();
    res.status(200).json({
      message: "Follower added and follow request removed successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error updating followers and follow requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteFollowers = async (req, res) => {
  const { id, userid } = req.params;
  try {
    let user = await Skilledperson.findById(id);
    if (!user) {
      user = await Investor.findById(id);
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.followRequest = user.followRequest.filter(
      (requestId) => requestId.toString() !== userid
    );
    await user.save();
    res.status(200).json({
      message: "Follower added and follow request removed successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error updating followers and follow requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const user =
      (await Skilledperson.findById(id)) || (await Investor.findById(id));

    if (user) {
      const requestDetails = user.followRequest;
      const request = [];

      for (const reqPerson of requestDetails) {
        const personDetails =
          (await Skilledperson.findById(reqPerson)) ||
          (await Investor.findById(reqPerson));
        if (personDetails) {
          request.push(personDetails);
        }
      }

      res.json(request);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving follow requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFollowers = async (req, res) => {
  const { id } = req.params;
  let user;
  user = await Skilledperson.findById(id);
  if (!user) {
    user = await Investor.findById(id);
  }
  if (user) {
    let followers = [];
    for (let i = 0; i < user.followers.length; i++) {
      let follower;
      follower = await Skilledperson.findById(user.followers[i]);
      if (!follower) {
        follower = await Investor.findById(user.followers[i]);
      }
      // If follower exists, add it to followers array
      if (follower) {
        followers.push(follower);
      }
    }
    // Send followers array as JSON response
    res.json(followers);
  } else {
    // If user not found, send 404 status
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  createFollowers,
  findUser,
  changeFollowers,
  sendRequest,
  deleteFollowers,
  getFollowers,
};
