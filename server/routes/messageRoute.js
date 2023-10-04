const router = require('express').Router();
const MessageController = require('../controllers/messageController');

router.post('/addMess', MessageController.addMessage);
router.post('/getAllMess', MessageController.getAllMessages);

module.exports = router;
