// InterviewCard.js
import React from 'react';
import './InterviewCard.css';

const InterviewCard = ({ title }) => {
    return (
        <div className="interview-card">
            <div className="interview-card-content">
                <div>{title}</div>
            </div>
        </div>
    );
};

export default InterviewCard;
