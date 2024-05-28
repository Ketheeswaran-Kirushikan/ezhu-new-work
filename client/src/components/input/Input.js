import React from 'react';
import './Input.css';

const Input = (props) => {
  return (
    <div>
      <input 
        className={props.className}
        placeholder={props.placeholder} 
        id={props.inputId} 
        type={props.type} 
        value={props.value} 
        onChange={props.onChange}
        name={props.name}

      />
    </div>
  );
};

export default Input;