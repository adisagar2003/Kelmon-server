const express = require("express");
const user_model = require("./models/user");
const connect_db = require("./utils/db_conn");
const multer = require('multer');
const blogRouter = require('./routes/blog_route');
const authRouter = require('./routes/auth_route');
const userRouter = require('./routes/user_route');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');
var cookieParser = require('cookie-parser')
require("dotenv").config();



// Middlewares
server.use(cors());
server.use('/uploads',express.static('uploads'))
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }))
connect_db();
server.use(cookieParser());
//..........

//Multer Storage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
});



// Routes
try{
server.use(
  '/api/v1/auth',authRouter
)

server.use(
    '/api/v1/user',userRouter
);
server.use(
    '/api/v1/blog',blogRouter
)
}
catch(err){
  res.status(400).json({
    error: err.message
  })
}
//..........
server.listen(5000, (req, res) => {
  console.log("listen");
});
