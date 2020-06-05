import axios from 'axios';
import { api } from 'env';

export const loadLogs = async () => {
  return await axios.get(`${api}/log`);
};

export const deleteLog = async id => {
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

export const arquivarLog = async id => {
  return await axios.put(`${api}/log/arquivar/${id}`);
};

export const arquivarSelectLogs = async idLogsList => {
  var idLogsListQuery = [];
  idLogsListQuery = idLogsList.reduce((cont, id) => {
    return cont + `&ids=${id}`;
  });

  return await axios.put(`${api}/log/arquivarAll/?ids=${idLogsListQuery}`);
};
