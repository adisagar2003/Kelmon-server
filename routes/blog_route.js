const express = require(
'express'
);
const post_controller = require('../controllers/postController');

const router = express.Router();

router.route(

    '/'
    
).get(post_controller.getBlogs).post(post_controller.postBlogs);

module.exports = router