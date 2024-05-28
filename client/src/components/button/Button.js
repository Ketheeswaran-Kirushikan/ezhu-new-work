import React from "react";
import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ icon, className, onClick, name, userdata }) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={className}
          userdata={userdata}
        />
      )}
      {name}
    </button>
  );
};

export default Button;
