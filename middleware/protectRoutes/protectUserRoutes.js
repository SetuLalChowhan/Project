const jwt = require('jsonwebtoken');
const User= require('../../Database/models/user')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'setu', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/userLogin');
      } else {
        
        next();
      }
    });
  } else {
    res.redirect('/userLogin');
  }
};


const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'setu', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth ,checkUser};