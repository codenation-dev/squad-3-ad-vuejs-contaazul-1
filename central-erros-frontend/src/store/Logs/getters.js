import { tipo, local } from '@/utils/constants';

const qtdLogsProducao = ({ logs }) =>
  parseInt(
    logs.reduce((counter, current) => {
      return current.level === local.producao ? counter + 1 : counter;
    }, 0),
  );

const qtdLogsHml = ({ logs }) =>
  parseInt(
    logs.reduce((counter, current) => {
      return current.level === local.hml ? counter + 1 : counter;
    }, 0),
  );

const qtdLogsDev = ({ logs }) =>
  parseInt(
    logs.reduce((counter, current) => {
      return current.level === local.dev ? counter + 1 : counter;
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

export default {
  qtdLogsProducao,
  qtdLogsHml,
  qtdLogsDev,
  qtdErrors,
  qtdWarnings,
  qtdDebugs,
};
