import axios from 'axios';

const api_url = process.env.REACT_APP_DB_API_URL;

export const sendMessage = async (message) => {
  return axios.post(api_url + '/message/addMess', message);
};

export const getAllMessages = async (messageInfo) => {
  return axios.post(api_url + '/message/getAllMess', messageInfo);
};
