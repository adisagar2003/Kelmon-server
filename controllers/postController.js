const blog_model = require("../models/blog");
const jwt = require("jsonwebtoken");
const check_auth = require("../middlewares/check_auth");
module.exports = {
  getBlogs: async (req, res) => {
    try{
    console.log(req.cookies);
    const data = await blog_model.find(req.query).limit(req.query.limit).populate('user');

    res.json({
      status: "success",
      data: data,
  });}
    catch(err){
      res.status(400).json({
        error:err.message 
      })
    }
  },
  postBlogs: async (req, res, check_auth) => {
    console.log(req.body);
    try{
    const current_user = req.headers.authorization.split(" ")[1];
    const current_user_decoded = await jwt.verify(
      current_user,
      process.env.JWT_SECRET
    );
    console.log(typeof current_user_decoded, "CURENT");
    const blog_data = {
      content: req.body.content,
      image: req.body.image,
      user: (current_user_decoded.replace(/['"]+/g, '')),
    };

    const new_blog = new blog_model(blog_data);
    const data = await new_blog.save();

    res.status(200).json({
      user: data,
      status: "success",
    });}
    catch(err){
      console.log(err);
      res.status(400).json({
        error:err.message
      });
    }
  },
  updateBlog: async (req, res) => {
    post_id = req.params.blog_id;
    const data = await blog_model.findByIdAndUpdate(post_id, {
      content: req.body.content,
      image: req.body.image,
    });
    res.json({
      blog: data,
      status: "success",
    });
  },
  deleteBlog: async (req, res) => {
    post_id = req.params.blog_id;
    const data = await blog_model.findByIdAndDelete(post_id);
    res.json({
      blog: data,
      status: "success",
    });
  },
};
