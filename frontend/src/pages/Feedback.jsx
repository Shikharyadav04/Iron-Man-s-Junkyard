// FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
    const [transactionId, setTransactionId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/feedback', {
                transactionId,
                customerId,
                message,
                rating,
            });
            console.log('Feedback submitted:', response.data);
            // Reset the form fields
            setTransactionId('');
            setCustomerId('');
            setMessage('');
            setRating(1);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Submit Your Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Feedback Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                />
                <select 
                    value={rating} 
                    onChange={(e) => setRating(Number(e.target.value))} 
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>
                            {star} Star
                        </option>
                    ))}
                </select>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default Feedback;
