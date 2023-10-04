const router = require('express').Router();

const UserRouter = require('./userRoute');
const MessageRouter = require('./messageRoute');

router.use('/user', UserRouter);
router.use('/message', MessageRouter);

module.exports = router;
