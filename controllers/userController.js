const e = require("express");
const mongoose = require("mongoose");
const { find } = require("../models/user");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const user_model = require("../models/user");
const generate_token = require("../utils/generate_token");
module.exports = {
  getUsers: async (req, res) => {
    const data = await user_model.find({});

    res.json({
      users: data,
      success: "success",
    });
  },
  postUsers: async (req, res) => {
    console.log(req);
    const user_data = {
      user_name: req.body.user_name,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      image_path:req.file.path,
    };
    if (req.body.password == req.body.confirmPassword) {
      const user = new user_model(user_data);
      const data = await user.save();
      res.status(200).json({
        user: data,
        status: "success",
      });
    } else {
      res.status(400).json({
        error: "failed to register",
      });
    }
  },
  updateUser: async (req, res) => {
    const user_id = req.params.id;
    
    const data = await user_model.findByIdAndUpdate(user_id, req.body);
    res.json({
      user: data,
      status: "success",
    });
  },
  deleteUser: async (req, res) => {
    const user_id = req.params.id;
    const data = await user_model.findByIdAndDelete(user_id);
    res.json({
      user: "deleted",
      status: "success",    
    });
  },
};
