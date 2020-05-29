import axios from 'axios';
import { api } from 'env';

export const loadLogs = async userToken => {
  const headers = { Authorization: `Bearer ${userToken}` };

  return await axios.get(`${api}/log`, { headers });
};

export const deleteLogs = async (id, userToken) => {
  const headers = { Authorization: `Bearer ${userToken}` };

  return await axios.delete(`${api}/log/${id}`, { headers });
};
