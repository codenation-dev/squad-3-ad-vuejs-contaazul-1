export const getTotalByYearData = ({ dev, hml, prod }) => ({
  labels: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  datasets: [
    {
      label: 'PROD',
      backgroundColor: '#1B5E53',
      borderColor: '#1B5E53',
      fill: false,
      data: prod,
    },
    {
      label: 'HML',
      backgroundColor: '#611B1C',
      borderColor: '#611B1C',
      fill: false,
      data: hml,
    },
    {
      label: 'DEV',
      backgroundColor: '#4D1E6B',
      borderColor: '#4D1E6B',
      fill: false,
      data: dev,
    },
  ],
});
