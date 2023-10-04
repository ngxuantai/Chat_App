const messageModel = require('../models/messageModel');

module.exports.addMessage = async (req, res) => {
  // const {text, users, sender} = req.body;
  try {
    const {from, to, message} = req.body;
    const data = await messageModel.create({
      message: {text: message},
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({message: 'Message sent'});
    return res.json({message: 'Message not sent'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
module.exports.getAllMessages = async (req, res) => {
  try {
    const {from, to} = req.body;
    const messages = await messageModel
      .find({
        users: {$all: [from, to]},
      })
      .sort({createdAt: -1});
    const listMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
        // sender: message.sender,
        // createdAt: message.createdAt,
      };
    });
    return res.json(listMessages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
