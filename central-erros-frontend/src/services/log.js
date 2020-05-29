import axios from 'axios';
import { api } from 'env';

export const loadLogs = async () => {
  return await axios.get(`${api}/log`);
};
