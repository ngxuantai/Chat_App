const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.ATLAS_URI;

async function connectionDB() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(uri, connectionParams);
    console.log('Connected to database.');
  } catch (error) {
    console.log('Could not connect to database.', error);
  }
}

module.exports = connectionDB;
