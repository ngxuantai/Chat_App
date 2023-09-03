import axios from 'axios';

// require('dotenv').config();
const api_url = process.env.DB_API_URL || 'http://localhost:5000';

export const signupUser = async (user) => {
  return axios.post(api_url + '/user/signup', user);
};

export const loginUser = async (user) => {
  return axios.post(api_url + '/user/login', user);
};

export const setAvatar = async (image) => {
  return axios.post(api_url + '/user/setavatar', image, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
