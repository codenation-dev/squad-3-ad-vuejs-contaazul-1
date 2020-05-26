export const getTotalByTipoData = ({ error, warning, debug }) => ({
  labels: ['Total'],
  datasets: [
    {
      label: 'ERROR',
      backgroundColor: '#750102',
      data: [error],
    },
    {
      label: 'WARNING',
      backgroundColor: '#e77901',
      data: [warning],
    },
    {
      label: 'DEBUG',
      backgroundColor: '#1c2e54',
      data: [debug],
    },
  ],
});
