const express = require('express');
const cors = require('cors');
const router = require('./routes');
const connectionDB = require('./connectionDB');

const app = express();
require('dotenv').config();

connectionDB();

app.use(cors());
app.use(express.json());
app.use('/', router);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
