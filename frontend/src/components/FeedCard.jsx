// FeedbackCards.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedCard = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('/api/feedback');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div>
            {feedbacks.map((feedback) => (
                <div key={feedback._id} className="feedback-card">
                    <h3>Transaction ID: {feedback.transactionId}</h3>
                    <h4>Customer ID: {feedback.customerId}</h4>
                    <p>{feedback.message}</p>
                    <p>Rating: {feedback.rating} Stars</p>
                    <p>Submitted at: {new Date(feedback.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default FeedCard;
