import { tipo, local } from '@/utils/constants';
import moment from 'moment';

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

const errorsByYear = ({ logs }) => {
  const yearArray = new Array(12).fill(0);
  const errors = logs.filter(log => log.level === tipo.error);
  errors.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const warningsByYear = ({ logs }) => {
  const yearArray = new Array(12).fill(0);
  const warnings = logs.filter(log => log.level === tipo.warning);
  warnings.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const debugsByYear = ({ logs }) => {
  const yearArray = new Array(12).fill(0);
  const debugs = logs.filter(log => log.level === tipo.debug);
  debugs.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

export default {
  qtdLogsProducao,
  qtdLogsHml,
  qtdLogsDev,
  qtdErrors,
  qtdWarnings,
  qtdDebugs,
  errorsByYear,
  warningsByYear,
  debugsByYear,
};
