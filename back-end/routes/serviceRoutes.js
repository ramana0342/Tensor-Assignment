// routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const CustomerServiceRequest = require('../models/CustomerServiceRequest');
//const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { authenticateJwt } = require('../middlewares/authMiddleware');
// Submit customer service request

router.post('/submit',authenticateJwt(),  async (req, res) => {
  const { category, comments } = req.body;
  console.log(category, comments,req.user.id)
  try {
    const { category, comments } = req.body;
      console.log(category, comments)
    const newRequest = new CustomerServiceRequest({
      category,
      comments
      //userId: req.user.id, // Assuming req.user contains the logged-in user's information
    });

    await newRequest.save();

    // Send to Intercom.com using Axios
    const intercomResponse = await axios.post(
      'https://api.intercom.io/conversations',
      {
        from: {
          type: 'user',
          //id: req.user.id,
        },
        body: comments,
        // Add other necessary Intercom parameters
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.INTERCOM_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Customer service request submitted successfully' });
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Retrieve customer service requests by category
router.get('/requests/:category', async (req, res) => {
  try {
    const category = req.params.category;

    const requests = await CustomerServiceRequest.find({ category });

    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
