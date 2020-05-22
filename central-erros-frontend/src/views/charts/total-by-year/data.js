export const getTotalByYearData = ({ error, warning, debug }) => ({
  labels: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  datasets: [
    {
      label: 'ERROR',
      backgroundColor: '#FF9993',
      borderColor: '#FF9993',
      fill: false,
      data: error,
    },
    {
      label: 'WARNING',
      backgroundColor: '#B590E8',
      borderColor: '#B590E8',
      fill: false,
      data: warning,
    },
    {
      label: 'DEBUG',
      backgroundColor: '#90E8A5',
      borderColor: '#90E8A5',
      fill: false,
      data: debug,
    },
  ],
});
