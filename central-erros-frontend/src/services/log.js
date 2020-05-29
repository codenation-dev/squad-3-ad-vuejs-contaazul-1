import axios from 'axios';
import { api } from 'env';

export const loadLogs = async () => {
  return await axios.get(`${api}/log`);
};

export const deleteLogs = async (id, userToken) => {
  const headers = { Authorization: `Bearer ${userToken}` };

  return await axios.delete(`${api}/log/${id}`, { headers });
};
