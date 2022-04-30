import axios from 'axios';

const API_URL = '/api/v1/';

const sendEmail = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const reponse = await axios.post(API_URL + 'sendEmail', data, config);

  return reponse.data;
};

const bulkEmail = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const reponse = await axios.post(API_URL + 'mail', data, config);
  return reponse.data;
};

const getEmail = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const reponse = await axios.get(API_URL + 'mail', config);
  return reponse.data;
};

const emailService = {
  sendEmail,
  bulkEmail,
  getEmail,
};

export default emailService;
