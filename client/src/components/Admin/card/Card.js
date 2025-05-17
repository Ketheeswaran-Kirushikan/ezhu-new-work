import React from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Card = ({ icon, title, value, className }) => {
  return (
    <div className="col-md-3">
      <div className={`dashboard-card-body ${className || ''}`}>
        <FontAwesomeIcon icon={icon} className={className} />
        <h5 className="card-title">{title}</h5>
        <p className="card-value">{value || 'N/A'}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default Card;