const mongoose = require("mongoose");
const Skilledperson = require("../models/skillperson.model");
const Investor = require("../models/investors.model");

const createFollowers = async (req, res) => {
  try {
    const { id, userid } = req.params;
    console.log("Getted ID:", id, "Follower ID:", userid);

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
    const allSkilledWorkers = await Skilledperson.find({}, "_id");
    const skilledWorkerIds = allSkilledWorkers.map((worker) =>
      worker._id.toString()
    );
    const user =
      (await Skilledperson.findById(id)) || (await Investor.findById(id));
    if (user) {
      const followersRequest = user.followRequest.map((followerId) =>
        followerId.toString()
      );
      const followers = user.followers.map((followerId) =>
        followerId.toString()
      );
      const notFollowedIds = skilledWorkerIds.filter(
        (workerId) =>
          !followersRequest.includes(workerId) && !followers.includes(workerId)
      );
      const notFollowedDetails = await Skilledperson.find({
        _id: { $in: notFollowedIds },
      });
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

module.exports = {
  createFollowers,
  findUser,
  changeFollowers,
  sendRequest,
  deleteFollowers,
};
