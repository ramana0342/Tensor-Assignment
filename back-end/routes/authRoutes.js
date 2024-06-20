// routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

require("../passport-setup")
// Google OAuth login route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
    
  // Successful authentication, redirect or send response as needed
  res.redirect('http://localhost:3000/CustomerServiceForm');
});

module.exports = router;
