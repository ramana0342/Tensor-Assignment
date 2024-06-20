// components/ServiceRequests.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Service Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <strong>Category:</strong> {request.category}<br />
            <strong>Comments:</strong> {request.comments}<br />
            <strong>User:</strong> {request.userId}<br />
            <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceRequests;
