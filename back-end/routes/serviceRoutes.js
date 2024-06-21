

const express = require('express');
const router = express.Router();
const axios = require('axios');
const CustomerServiceRequest = require('../models/CustomerServiceRequest');
//const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { authenticateJwt } = require('../middlewares/authMiddleware');


router.post('/submit',authenticateJwt(),  async (req, res) => {
  const { category, comments } = req.body;
  console.log(category, comments,req.user.id)
  try {
    const { category, comments } = req.body;
      console.log(category, comments)
    const newRequest = new CustomerServiceRequest({
      category,
      comments
      //userId: req.user.id, 
    });

    await newRequest.save();

    
    const intercomResponse = await axios.post(
      'https://api.intercom.io/conversations',
      {
        from: {
          type: 'user',
          //id: req.user.id,
        },
        body: comments,
  
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
