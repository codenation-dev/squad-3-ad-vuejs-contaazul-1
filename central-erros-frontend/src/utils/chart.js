export const configChart = chartTitle => ({
  responsive: true,
  title: { display: true, text: chartTitle },
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = tooltipItem.yLabel;
        return `${label}: ${value}`;
      },
      title() {
        return;
      },
    },
  },
});
