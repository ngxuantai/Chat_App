const router = require('express').Router();

const UserRouter = require('./userRoute');

router.use('/user', UserRouter);

module.exports = router;
