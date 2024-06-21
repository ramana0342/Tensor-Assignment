


// const ensureAuthenticated = (req, res, next) => {

//     if (req.isAuthenticated()) {
//       return next(); 
//     } else {
//     
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//   };



const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User'); 

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub);
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
  