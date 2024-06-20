// // middlewares/authMiddleware.js

// // Middleware to ensure user is authenticated
// const ensureAuthenticated = (req, res, next) => {
//     // Assuming you have a way to check if the user is authenticated
//     if (req.isAuthenticated()) {
//       return next(); // User is authenticated, proceed to the next middleware or route handler
//     } else {
//       // User is not authenticated, return an error response
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//   };

// middleware/authMiddleware.js

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User'); // Replace with your user model

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub); // Assuming sub is the user ID
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = {
  initialize: () => passport.initialize(),
  authenticateJwt: () => passport.authenticate('jwt', { session: false }),
};

  
//  module.exports = { ensureAuthenticated };
  