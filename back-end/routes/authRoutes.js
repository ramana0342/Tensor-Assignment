

const express = require('express');
const passport = require('passport');
const router = express.Router();

require("../passport-setup")

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));


router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
    
  
  res.redirect('http://localhost:3000/CustomerServiceForm');
});

module.exports = router;
