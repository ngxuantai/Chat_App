import axios from 'axios';

// require('dotenv').config();
const api_url = process.env.DB_API_URL || 'http://localhost:5000';

export const createUser = async (user) => {
  console.log(user);
  console.log(api_url);
  return axios.post(api_url + '/user/create', user);
};
