export const data = ({ prod, hml, dev }) => ({
  labels: ['Total'],
  datasets: [
    {
      label: 'PROD',
      backgroundColor: '#FF9993',
      data: [prod],
    },
    {
      label: 'HML',
      backgroundColor: '#B590E8',
      data: [hml],
    },
    {
      label: 'DEV',
      backgroundColor: '#90E8A5',
      data: [dev],
    },
  ],
});
