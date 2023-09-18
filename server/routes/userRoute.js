const router = require('express').Router();
const UserControllers = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

router.post('/signup', UserControllers.SignupUser);
router.post('/login', UserControllers.LoginUser);
router.post('/setAvatar', verifyToken, UserControllers.SetAvatar);
router.get('/getAll', verifyToken, UserControllers.GetAllUser);

module.exports = router;
