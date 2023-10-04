import axios from 'axios';

const api_url = process.env.REACT_APP_DB_API_URL;

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
