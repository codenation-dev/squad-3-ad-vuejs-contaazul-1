import { tipo } from '@/utils/constants';
import moment from 'moment';

export const genericFormatLogs = (
  logs,
  filterColumnListLogs,
  filterSearchLog,
) => {
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

export const genericFilteredLogs = (filterLogsLevel, getters) => {
  var arrayFiltered = [];
  if (filterLogsLevel && filterLogsLevel.length > 0) {
    filterLogsLevel.forEach(level => {
      getters.formatLogs.forEach(log => {
        if (log.local == level) {
          arrayFiltered.push(log);
        }
      });
    });
  }
  return arrayFiltered;
};
