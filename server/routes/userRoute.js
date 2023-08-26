const router = require('express').Router();
const UserControllers = require('../controllers/userController');

router.post('/signup', UserControllers.Signup);
router.post('/login', UserControllers.LoginUser);

module.exports = router;
