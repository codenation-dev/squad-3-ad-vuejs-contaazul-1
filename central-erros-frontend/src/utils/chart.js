export const configLineChart = () => ({
  responsive: true,
  title: { display: false },
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          precision: 0,
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

export const configDoughnutChart = () => ({
  responsive: true,
  maintainAspectRatio: false,
});
