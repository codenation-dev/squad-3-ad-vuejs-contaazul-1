export const getTotalByLocalData = ({ prod, hml, dev }) => ({
  labels: ['Total'],
  datasets: [
    {
      label: 'PROD',
      backgroundColor: '#1B5E53',
      data: [prod],
    },
    {
      label: 'HML',
      backgroundColor: '#611B1C',
      data: [hml],
    },
    {
      label: 'DEV',
      backgroundColor: '#4D1E6B',
      data: [dev],
    },
  ],
});
