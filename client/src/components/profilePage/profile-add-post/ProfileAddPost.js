import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profileAddPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import backendUrl from "../../../context/Config";

const ProfileAddPost = ({ userData }) => {
  const [image, setImage] = useState(null);
  const { images, _id, role } = userData || {};

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const imgData = {
          src: e.target.result,
          file,
        };
        setImage(imgData);
      };
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const [formData, setFormData] = useState({
    description: "",
    createdAt: new Date(),
    created_by: _id,
    post_image: "",
    role: role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      created_by: _id,
      role: role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      alert("Please enter a description for your post.");
      return;
    }

    const postData = new FormData();
    for (let key in formData) {
      postData.append(key, formData[key]);
    }
    if (image) {
      postData.append("post_image", image.file, image.file.name);
    }

    try {
      const response = await axios.post(
        `${backendUrl}/Ezhu/Post/createPost`,
        postData
      );
      console.log("Post created successfully:", response.data);
      alert("Your post has been created successfully!");

      setFormData({
        description: "",
        createdAt: new Date(),
        created_by: _id,
        post_image: "",
        role: role,
      });
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Post creation failed. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="post-container">
        <div className="profile-image">
          <img src={images} className="profile-image" alt="profilePic" />
        </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="form-group post-text-area">
              <label htmlFor="post-text">
                <h2>Share your needs!</h2>
              </label>
              <textarea
                className="form-control post-input"
                id="post-text"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="container-fluid mt-5">
              <div className="row">
                <div className="col p-0">
                  <div className="profile-card">
                    {image && (
                      <div className="image-container">
                        <div className="image-wrapper">
                          <img
                            src={image.src}
                            alt={`Image`}
                            className="image"
                            onClick={handleImageRemove}
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-center upload-container">
                      <label htmlFor="fileUpload" className="custom-icon">
                        <FontAwesomeIcon
                          icon={faImages}
                          style={{ color: "#1c71d8" }}
                        />
                      </label>
                      <input
                        type="file"
                        id="fileUpload"
                        className="file-input"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        name="post_image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileAddPost;
