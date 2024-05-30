const mongoose = require("mongoose");
const Skilledperson = require("../models/skillperson.model");
const Investor = require("../models/investors.model");

const createFollowers = async (req, res) => {
  try {
    const { id, userid } = req.params;

    if (!id || !userid) {
      return res
        .status(400)
        .json({ error: "Both user ID and follower ID are required" });
    }

    let user =
      (await Skilledperson.findById(id)) || (await Investor.findById(id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.followRequest.includes(userid)) {
      let userfollow =
        (await Skilledperson.findById(userid)) ||
        (await Investor.findById(userid));
      console.log(userid);
      userfollow.followRequest.push(userid);
      await userfollow.save();
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
    const allSkilledWorkers = await Skilledperson.find({}, "_id role");
    const allInvestors = await Investor.find({}, "_id role");
    const allUsers = [...allSkilledWorkers, ...allInvestors];
    console.log(allUsers);
    const user = allUsers.find((user) => user._id.toString() === id);

    if (user) {
      const followersRequest = user.followRequest || [];
      const followers = user.followers || [];

      const notFollowedIds = allUsers
        .map((user) => ({ _id: user._id.toString(), role: user.role }))
        .filter(
          (worker) =>
            !(
              followersRequest.includes(worker._id) ||
              followers.includes(worker._id)
            )
        );

      const notFollowedDetails = await Promise.all(
        notFollowedIds.map(async ({ _id, role }) => {
          const userDetails =
            (await Skilledperson.findById(_id)) ||
            (await Investor.findById(_id));
          return { ...userDetails.toJSON(), role };
        })
      );

      res.json(notFollowedDetails);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
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
  // Find the user by ID in Skilledperson collection
  user = await Skilledperson.findById(id);
  // If user not found in Skilledperson collection, find in Investor collection
  if (!user) {
    user = await Investor.findById(id);
  }
  if (user) {
    let followers = [];
    // Loop through user's followers
    for (let i = 0; i < user.followers.length; i++) {
      let follower;
      // Find follower in Skilledperson collection
      follower = await Skilledperson.findById(user.followers[i]);
      // If follower not found in Skilledperson collection, find in Investor collection
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
