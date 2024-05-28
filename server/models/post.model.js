const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  post_image: {
    type: String,
  },
  created_by: {
    type: String,
  },
  role: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
