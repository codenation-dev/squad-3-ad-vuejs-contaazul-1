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

const devByYear = ({ logs }) => {
  const yearArray = new Array(moment().month() + 1).fill(0);
  const devLogs = logs.filter(log => log.local === local.dev);
  devLogs.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const hmlByYear = ({ logs }) => {
  const yearArray = new Array(moment().month() + 1).fill(0);
  const hmlLogs = logs.filter(log => log.local === local.hml);
  hmlLogs.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const prodByYear = ({ logs }) => {
  const yearArray = new Array(moment().month() + 1).fill(0);
  const prodLogs = logs.filter(log => log.local === local.producao);
  prodLogs.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const formatedLogs = ({ logs }) =>
  logs.map(log => {
    log.data = moment(log.data).format('DD/MM/YYYY');
    if (log.level == 1) {
      log.level = 'debug';
    } else if (log.level == 2) {
      log.level = 'warning';
    } else if (log.level == 3) {
      log.level = 'error';
    }
    return log;
  });

const filteredLogs = ({ filterLogsLevel }, getters) => {
  var arrayFiltered = [];
  filterLogsLevel.forEach(level => {
    getters.formatedLogs.forEach(log => {
      if (log.local == level) {
        arrayFiltered.push(log);
      }
    });
  });
  return arrayFiltered;
};
const qtdErrorsByYear = ({ logs, showDevYear, showHmlYear, showProdYear }) =>
  logs.reduce((counter, current) => {
    if (
      moment(current.data).format('YYYY') == moment().year() &&
      current.level === tipo.error
    ) {
      showDevYear && current.local === local.dev && counter++;
      showHmlYear && current.local === local.hml && counter++;
      showProdYear && current.local === local.producao && counter++;
      return counter;
    } else {
      return counter;
    }
  }, 0);

const qtdWarningsByYear = ({ logs, showDevYear, showHmlYear, showProdYear }) =>
  logs.reduce((counter, current) => {
    if (
      moment(current.data).format('YYYY') == moment().year() &&
      current.level === tipo.warning
    ) {
      showDevYear && current.local === local.dev && counter++;
      showHmlYear && current.local === local.hml && counter++;
      showProdYear && current.local === local.producao && counter++;
      return counter;
    } else {
      return counter;
    }
  }, 0);

const qtdDebugsByYear = ({ logs, showDevYear, showHmlYear, showProdYear }) =>
  logs.reduce((counter, current) => {
    if (
      moment(current.data).format('YYYY') == moment().year() &&
      current.level === tipo.debug
    ) {
      showDevYear && current.local === local.dev && counter++;
      showHmlYear && current.local === local.hml && counter++;
      showProdYear && current.local === local.producao && counter++;
      return counter;
    } else {
      return counter;
    }
  }, 0);

export default {
  qtdLogsProducao,
  qtdLogsHml,
  qtdLogsDev,
  qtdErrors,
  qtdWarnings,
  qtdDebugs,
  formatedLogs,
  filteredLogs,
  devByYear,
  hmlByYear,
  prodByYear,
  qtdErrorsByYear,
  qtdWarningsByYear,
  qtdDebugsByYear,
};
