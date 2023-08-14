const router = require('express').Router();
const UserControllers = require('../controllers/userController');

router.post('/create', UserControllers.CreateUser);

module.exports = router;
