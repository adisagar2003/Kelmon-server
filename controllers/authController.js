const user_model = require("../models/user");
const bcrypt = require("bcrypt");
const generate_token = require("../utils/generate_token");

module.exports = {
  login: async (req, res) => {
    const { user_name, password } = req.body;
    const data = await user_model.findOne({ user_name: user_name });
    if (data && (await bcrypt.compare(password, data.password))) {
      const token = await generate_token(data.id);
      res.cookie("access_token", token);
      res.status(200).json({
        status: "success",
        token: token,
        user: {
          user_name: data.user_name,
          blogs: data.blogs,
          id: data._id,
          created_at: data.created_at,
          profile_image: data.image_path
        },
      });
    } else {
      res.status(440).json({
        error: "User not found",
      });
    }
  },
};
