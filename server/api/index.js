const router = require('express').Router();
const userRoute = require('./user/userRoute');

router.use('/users', userRoute);

module.exports = router;
