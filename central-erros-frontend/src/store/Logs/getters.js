import { tipo, local } from '@/utils/constants';
import moment from 'moment';

const qtdTotal = ({ logs }) => logs.length;

const qtdLogsProducao = ({ logs }) =>
  parseInt(
    logs.reduce((counter, current) => {
      return current.local === local.producao ? counter + 1 : counter;
    }, 0),
  );

const qtdLogsHml = ({ logs }) =>
  parseInt(
    logs.reduce((counter, current) => {
      return current.local === local.hml ? counter + 1 : counter;
    }, 0),
  );

const qtdLogsDev = ({ logs }) =>
  parseInt(
    logs.reduce((counter, current) => {
      return current.local === local.dev ? counter + 1 : counter;
    }, 0),
  );

const qtdErrors = ({ logs }) =>
  logs.reduce((counter, current) => {
    return current.level === tipo.error ? counter + 1 : counter;
  }, 0);

const qtdWarnings = ({ logs }) =>
  logs.reduce((counter, current) => {
    return current.level === tipo.warning ? counter + 1 : counter;
  }, 0);

const qtdDebugs = ({ logs }) =>
  logs.reduce((counter, current) => {
    return current.level === tipo.debug ? counter + 1 : counter;
  }, 0);

const devByYear = ({ logs }) => {
  const yearArray = new Array(12).fill(0);
  const devLogs = logs.filter(log => log.local === local.dev);
  devLogs.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const hmlByYear = ({ logs }) => {
  const yearArray = new Array(12).fill(0);
  const hmlLogs = logs.filter(log => log.local === local.hml);
  hmlLogs.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const prodByYear = ({ logs }) => {
  const yearArray = new Array(12).fill(0);
  const prodLogs = logs.filter(log => log.local === local.producao);
  prodLogs.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

export default {
  qtdTotal,
  qtdLogsProducao,
  qtdLogsHml,
  qtdLogsDev,
  qtdErrors,
  qtdWarnings,
  qtdDebugs,
  devByYear,
  hmlByYear,
  prodByYear,
};
