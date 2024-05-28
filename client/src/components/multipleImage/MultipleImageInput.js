import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../input/Input';
const MultipleImageInput = () => {
  const [images, setImages] = useState([]);
  
  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    const imageList = fileList.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageList]);
  };
  
  const handleClearImages = () => {
    setImages([]);
  };
  
  return (
    <div className="container">
      <Input type="file" className="form-control-file mt-2 inputTypeSignup" accept="image/*" multiple onChange={handleImageChange} />
      <div className="d-flex flex-wrap">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} className="img-thumbnail m-2" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        ))}
      </div>
      <button className="btn btn-danger mt-2" onClick={handleClearImages}>Clear Images</button>
    </div>
  );
};

export default MultipleImageInput;