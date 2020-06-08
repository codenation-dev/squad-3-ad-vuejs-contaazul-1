import moment from 'moment';

export const getTotalByMonthData = ({ error, warning, debug }) => ({
  labels: [...Array(moment().daysInMonth()).keys()].map(item => item + 1),
  datasets: [
    {
      label: 'ERROR',
      backgroundColor: '#750102',
      borderColor: '#750102',
      fill: false,
      data: error,
    },
    {
      label: 'WARNING',
      backgroundColor: '#e77901',
      borderColor: '#e77901',
      fill: false,
      data: warning,
    },
    {
      label: 'DEBUG',
      backgroundColor: '#1c2e54',
      borderColor: '#1c2e54',
      fill: false,
      data: debug,
    },
  ],
});
