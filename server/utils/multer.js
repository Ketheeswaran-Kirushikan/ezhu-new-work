const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storageSkilled = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "skilled_workers", // Change folder name as needed
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    resource_type: "auto",
  },
});

const uploadSkilled = multer({ storage: storageSkilled });

const storageInvestor = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "investors",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    resource_type: "auto",
  },
});

const uploadInvestor = multer({ storage: storageInvestor });

const storagePost = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Posts",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    resource_type: "auto",
  },
});

const uploadPost = multer({ storage: storagePost }).single("post_image");

module.exports = { uploadSkilled, uploadInvestor, uploadPost };
