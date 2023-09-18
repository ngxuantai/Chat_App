import axios from 'axios';

// require('dotenv').config();
const api_url = process.env.DB_API_URL || 'http://localhost:5000';

export const signupUser = async (user) => {
  return axios.post(api_url + '/user/signup', user);
};

export const loginUser = async (user) => {
  return axios.post(api_url + '/user/login', user);
};

export const setAvatar = async (avatarImage) => {
  console.log(avatarImage);
  return axios.post(api_url + '/user/setAvatar', avatarImage, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getAllUser = async () => {
  return axios.get(api_url + '/user/getAll', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
