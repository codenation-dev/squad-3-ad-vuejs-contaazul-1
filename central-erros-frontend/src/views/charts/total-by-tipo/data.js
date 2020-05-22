export const getTotalByTipoData = ({ error, warning, debug }) => ({
  labels: ['Total'],
  datasets: [
    {
      label: 'ERROR',
      backgroundColor: '#FF9993',
      data: [error],
    },
    {
      label: 'WARNING',
      backgroundColor: '#B590E8',
      data: [warning],
    },
    {
      label: 'DEBUG',
      backgroundColor: '#90E8A5',
      data: [debug],
    },
  ],
});
