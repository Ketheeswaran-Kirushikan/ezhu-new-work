import React from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = (props) => {
    return (
        <div className="col-md-3">
                <div className="dashboard-card-body">
                    <FontAwesomeIcon icon={props.icon} className={props.className} />
                    <h5 className="card-title">{props.title}</h5>
                </div>
        </div>
    );
};

export default Card;
