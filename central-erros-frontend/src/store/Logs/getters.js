import { tipo, local } from '@/utils/constants';
import moment from 'moment';

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

const errorByMonth = ({ logs }) => {
  const monthArray = new Array(moment().daysInMonth()).fill(0);
  const errorLogs = logs.filter(log => log.level === tipo.error);
  errorLogs.map(log => {
    const day = parseInt(moment(log.data).format('DD'));
    monthArray[day] = monthArray[day] + 1;
  });
  return monthArray;
};

const warningByMonth = ({ logs }) => {
  const monthArray = new Array(moment().daysInMonth()).fill(0);
  const warningLogs = logs.filter(log => log.level === tipo.warning);
  warningLogs.map(log => {
    const day = parseInt(moment(log.data).format('DD'));
    monthArray[day] = monthArray[day] + 1;
  });
  return monthArray;
};

const debugByMonth = ({ logs }) => {
  const monthArray = new Array(moment().daysInMonth()).fill(0);
  const debugLogs = logs.filter(log => log.level === tipo.debug);
  debugLogs.map(log => {
    const day = parseInt(moment(log.data).format('DD'));
    monthArray[day] = monthArray[day] + 1;
  });
  return monthArray;
};

const formatLogs = ({ logs, filterColumnListLogs, filterSearchLog }) => {
  var formatedLogs = logs.map(log => {
    log.data = moment(log.data).format('DD/MM/YYYY');
    if (log.level == tipo.debug) {
      log.level = 'debug';
    } else if (log.level == tipo.warning) {
      log.level = 'warning';
    } else if (log.level == tipo.error) {
      log.level = 'error';
    }
    return log;
  });

  var logsSpecificColumn = formatedLogs.filter(log => {
    if (filterColumnListLogs != null) {
      if (filterColumnListLogs.name == 'Level') {
        return log.level.toLowerCase().includes(filterSearchLog.toLowerCase());
      }

      if (filterColumnListLogs.name == 'Descrição') {
        return log.titulo.toLowerCase().includes(filterSearchLog.toLowerCase());
      }

      if (filterColumnListLogs.name == 'Origem') {
        return log.origem.toLowerCase().includes(filterSearchLog.toLowerCase());
      }

      if (filterColumnListLogs.name == 'Data') {
        return log.data.includes(filterSearchLog);
      }

      if (filterColumnListLogs.name == 'Evento') {
        return log.frequencia.toString().includes(filterSearchLog);
      }
    } else {
      return log;
    }
  });

  return logsSpecificColumn;
};

const filteredLogs = ({ filterLogsLevel }, getters) => {
  var arrayFiltered = [];
  filterLogsLevel.forEach(level => {
    getters.formatLogs.forEach(log => {
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
  formatLogs,
  filteredLogs,
  devByYear,
  hmlByYear,
  prodByYear,
  errorByMonth,
  warningByMonth,
  debugByMonth,
  qtdErrorsByYear,
  qtdWarningsByYear,
  qtdDebugsByYear,
};
