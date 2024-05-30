const express = require("express");
const PostSchema = require("../models/post.model");
const { uploadPost } = require("../utils/multer");
const cors = require("cors");
const skilledPerson = require("../models/skillperson.model");
const investor = require("../models/investors.model");

const app = express();
app.use(cors());

const createPost = async (req, res) => {
  uploadPost(req, res, async function (err) {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).json({ error: "File upload failed" });
    }

    const { description, createdAt, created_by, role } = req.body;
    if (!description || !createdAt || !created_by || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const post_image = req.file ? req.file.path : null; // Accessing req.file

    try {
      const newPost = new PostSchema({
        description,
        createdAt,
        post_image,
        created_by,
        role,
      });
      await newPost.save();
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Post creation failed" });
    }
  });
};

const deletePost = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Deleting Post with ID:", _id);
    const deletedData = await PostSchema.findByIdAndDelete(_id);
    if (!deletedData) {
      return res.status(404).json({ error: "Post not found" });
    }
    console.log("Deleted data:", deletedData);
    res.json({
      message: "Post deleted successfully",
      deletedPost: deletedData,
    });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ error: "An error occurred during deletion" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Updating Post with ID:", _id);
    const { description, skilledWorker, investor, createdAt, created_by } =
      req.body;
    if (!description || !createdAt || !created_by) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedPost = await PostSchema.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ error: "An error occurred during update" });
  }
};

const viewPost = async (req, res) => {
  try {
    const postDetails = await PostSchema.find();
    if (postDetails.length > 0) {
      let userDetailsArray = [];
      for (const post of postDetails) {
        let userDetails;
        if (post.role === "skilled person") {
          userDetails = await skilledPerson.findById(post.created_by);
        } else if (post.role === "Investor") {
          userDetails = await investor.findById(post.created_by);
        }
        userDetailsArray.push(userDetails);
      }
      res.json({ postDetails, userDetails: userDetailsArray });
      // console.log(userDetailsArray);
    } else {
      res.status(404).json({ error: "No posts found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const profileViewPost = async (req, res) => {
  const { _id } = req.params;
  try {
    const postDetails = await PostSchema.find({ created_by: _id });
    if (!postDetails || postDetails.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    let userDetails;
    const skilledUser = await skilledPerson.findById(_id);
    const investorUser = await investor.findById(_id);

    if (skilledUser) {
      userDetails = skilledUser;
    } else if (investorUser) {
      userDetails = investorUser;
    } else {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ postDetails, userDetails });
    console.log("Post details and user details fetched successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  viewPost,
  profileViewPost,
};
