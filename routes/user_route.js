const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const user_controller = require('../controllers/userController');
const router =express.Router();
router.route('/').get(user_controller.getUsers).post(upload.single('profile'),user_controller.postUsers);
router.route('/:id').patch(user_controller.updateUser).delete(user_controller.deleteUser);
module.exports = router