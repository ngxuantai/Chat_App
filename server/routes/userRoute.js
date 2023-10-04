const router = require('express').Router();
const UserController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

router.post('/signup', UserController.signupUser);
router.post('/login', UserController.loginUser);
router.post('/setAvatar', verifyToken, UserController.setAvatar);
router.get('/getAll', verifyToken, UserController.getAllUser);

module.exports = router;
