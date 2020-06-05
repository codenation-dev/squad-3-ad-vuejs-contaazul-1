import { tipo, local } from '@/utils/constants';
import { genericFormatLogs, genericFilteredLogs } from '@/utils/logs';
import moment from 'moment';

const devByYear = ({ logs }) => {
  const yearArray = new Array(moment().month() + 1).fill(0);
  const devLogs = logs.filter(log => log.local === local.dev);
  const logsCurrentYear = devLogs.filter(
    log => moment(log.data).format('YYYY') === moment().format('YYYY'),
  );
  logsCurrentYear.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const hmlByYear = ({ logs }) => {
  const yearArray = new Array(moment().month() + 1).fill(0);
  const hmlLogs = logs.filter(log => log.local === local.hml);
  const logsCurrentYear = hmlLogs.filter(
    log => moment(log.data).format('YYYY') === moment().format('YYYY'),
  );
  logsCurrentYear.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const prodByYear = ({ logs }) => {
  const yearArray = new Array(moment().month() + 1).fill(0);
  const prodLogs = logs.filter(log => log.local === local.producao);
  const logsCurrentYear = prodLogs.filter(
    log => moment(log.data).format('YYYY') === moment().format('YYYY'),
  );
  logsCurrentYear.map(log => {
    const month = parseInt(moment(log.data).format('MM'));
    yearArray[month - 1] = yearArray[month - 1] + 1;
  });
  return yearArray;
};

const errorByMonth = ({ logs }) => {
  const monthArray = new Array(moment().date()).fill(0);
  const errorLogs = logs.filter(
    log =>
      log.level === tipo.error &&
      moment(log.data).format('MM') === moment().format('MM'),
  );
  errorLogs.map(log => {
    const day = parseInt(moment(log.data).format('DD')) - 1;
    monthArray[day] = monthArray[day] + 1;
  });
  return monthArray;
};

const warningByMonth = ({ logs }) => {
  const monthArray = new Array(moment().date()).fill(0);
  const warningLogs = logs.filter(
    log =>
      log.level === tipo.warning &&
      moment(log.data).format('MM') === moment().format('MM'),
  );
  warningLogs.map(log => {
    const day = parseInt(moment(log.data).format('DD')) - 1;
    monthArray[day] = monthArray[day] + 1;
  });
  return monthArray;
};

const debugByMonth = ({ logs }) => {
  const monthArray = new Array(moment().date()).fill(0);
  const debugLogs = logs.filter(
    log =>
      log.level === tipo.debug &&
      moment(log.data).format('MM') === moment().format('MM'),
  );
  debugLogs.map(log => {
    const day = parseInt(moment(log.data).format('DD')) - 1;
    monthArray[day] = monthArray[day] + 1;
  });
  return monthArray;
};

const formatLogs = ({ logs, filterColumnListLogs, filterSearchLog }) => {
  return genericFormatLogs(logs, filterColumnListLogs, filterSearchLog).filter(
    log => !log.arquivado,
  );
};

const formatLogsArchived = ({
  logsArchived,
  filterColumnListLogsArchived,
  filterSearchLogArchived,
}) => {
  return genericFormatLogs(
    logsArchived,
    filterColumnListLogsArchived,
    filterSearchLogArchived,
  );
};

const filteredLogs = ({ filterLogsLevel }, { formatLogs }) => {
  return genericFilteredLogs(filterLogsLevel, formatLogs).filter(
    log => !log.arquivado,
  );
};

const filteredLogsArchived = (
  { filterLogsLevelArchived },
  { formatLogsArchived },
) => {
  return genericFilteredLogs(filterLogsLevelArchived, formatLogsArchived);
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

const totalLogs = ({ logs }) => logs.length;

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
  totalLogs,
  formatLogsArchived,
  filteredLogsArchived,
};
