const jwt = require('jsonwebtoken');
const Seller= require('../../Database/models/seller')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'setu', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/sellerLogin');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/sellerLogin');
  }
};


const checkSeller = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'setu', async (err, decodedToken) => {
      if (err) {
        res.locals.seller = null;
        next();
      } else {
        let seller = await Seller.findById(decodedToken.id);
        res.locals.seller = seller;
        next();
      }
    });
  } else {
    res.locals.seller = null;
    next();
  }
};


module.exports = { requireAuth ,checkSeller};