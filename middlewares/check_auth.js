const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const check_auth = async (req, res, next) => {
    try{
  const token = req.headers.authorization.split(" ")[1];
  const decoded_token = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded_token);
  if (req.body.id ==decoded_token){
    next();
  }
  else {
    throw 'Invalid User ID'
  }
}
  catch{
    res.status(401).json({
        error: new Error('token not verified')
    })
  }
};

module.exports = check_auth;