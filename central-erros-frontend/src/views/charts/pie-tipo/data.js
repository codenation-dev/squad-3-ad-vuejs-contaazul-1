export const getPieTipoData = ({ error, warning, debug }) => ({
  labels: ['ERROR', 'WARNING', 'DEBUG'],
  datasets: [
    {
      label: 'dataset',
      backgroundColor: ['#750102', '#e77901', '#1c2e54'],
      data: [error, warning, debug],
    },
  ],
});
