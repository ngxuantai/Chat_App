const express = require('express');
const cors = require('cors');
const router = require('./routes');
const connectionDB = require('./connectionDB');
const socket = require('socket.io');

const app = express();
require('dotenv').config();

connectionDB();

app.use(cors());
app.use(express.json());
app.use('/', router);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-mess', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('receive-mess', data.message);
    }
  });
});
