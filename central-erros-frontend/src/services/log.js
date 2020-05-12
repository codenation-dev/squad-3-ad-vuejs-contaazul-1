import axios from 'axios';
import { api } from 'env';

export const loadLogs = async userToken => {
  const headers = { Authorization: `Bearer ${userToken}` };

  return await axios.get(`${api}/log?locais=1&locais=2&locais=3`, { headers });
};
