const router = require('express').Router();
const userController = require('./userController');

router.route('/')
    .get(userController.getAllUsers);

module.exports = router;
