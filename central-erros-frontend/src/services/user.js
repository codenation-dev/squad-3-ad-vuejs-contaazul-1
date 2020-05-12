import axios from 'axios';
import { api } from 'env';

export const login = async ({ username, password }) => {
  const payload = {
    Email: username,
    Senha: password,
  };
  return await axios.post(`${api}/usuario/autenticar`, payload);
};
