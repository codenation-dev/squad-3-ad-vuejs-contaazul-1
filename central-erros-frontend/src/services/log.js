import axios from 'axios';
import { api } from 'env';

export const loadLogs = async () => {
  return await axios.get(`${api}/log`);
};

export const deleteLogs = async id => {
  return await axios.delete(`${api}/log/${id}`);
};

export const deleteSelectLogs = async idListLogs => {
  var idListLogQuery = [];
  idListLogQuery = idListLogs.reduce((cont, id) => {
    return cont + `&ids=${id}`;
  });

  return await axios.delete(`${api}/log/deleteAll/?ids=${idListLogQuery}`);
};

export const loadLogsArchived = async () => {
  return await axios.get(`${api}/log/arquivados`);
};
