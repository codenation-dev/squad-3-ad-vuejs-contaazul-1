<template>
  <div>
    <b-loading is-full-page :active.sync="isLoading" />
    <div class="charts-container">
      <div class="is-width-80 chart-box">
        <div class="filter">
          <month-filter />
        </div>
        <div class="local-container">
          <div class="month-title">
            <p class="title is-capitalized is-4">{{ currentMonth }}</p>
          </div>
          <div class="is-width-90 graphicModule">
            <total-by-month
              v-if="doneConfig"
              :chart-data="totalByMonthData"
              :options="LineChartConfig"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="charts-container chart-padding">
      <div class="chart-box is-width-80 anual-container">
        <div class="filter is-left-align">
          <year-filter />
        </div>
        <div class="local-container">
          <div class="is-width-60 graphicModule">
            <total-by-year
              v-if="doneConfig"
              :chart-data="totalByYearData"
              :options="LineChartConfig"
            />
          </div>
          <div class="is-width-40 graphicModule">
            <pie-tipo
              v-if="doneConfig"
              :chart-data="pieTipoData"
              :options="doughnutConfig"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import TotalByYear from './charts/total-by-year/view';
import TotalByMonth from './charts/total-by-month/view';
import PieTipo from './charts/pie-tipo/view';
import YearFilter from './filters/Year-chart-filter';
import MonthFilter from './filters/Moth-chart-filter';
import { getTotalByYearData } from './charts/total-by-year/data';
import { getTotalByMonthData } from './charts/total-by-month/data';
import { getPieTipoData } from './charts/pie-tipo/data';
import { configLineChart, configDoughnutChart } from '@/utils/chart';

import moment from 'moment';

export default {
  name: 'Dashboard',

  components: {
    TotalByYear,
    TotalByMonth,
    PieTipo,
    YearFilter,
    MonthFilter,
  },

  data() {
    return {
      LineChartConfig: {},
      doughnutConfig: {},
      doneConfig: false,
    };
  },

  computed: {
    ...mapGetters('Logs', [
      'devByYear',
      'hmlByYear',
      'prodByYear',
      'errorByMonth',
      'warningByMonth',
      'debugByMonth',
      'qtdErrorsByYear',
      'qtdWarningsByYear',
      'qtdDebugsByYear',
    ]),
    ...mapState('Logs', [
      'showProdYear',
      'showDevYear',
      'showHmlYear',
      'showErrorMonth',
      'showWarningMonth',
      'showDebugMonth',
      'isLoading',
    ]),
    totalByMonthData() {
      return getTotalByMonthData({
        error: this.showErrorMonth ? this.errorByMonth : null,
        warning: this.showWarningMonth ? this.warningByMonth : null,
        debug: this.showDebugMonth ? this.debugByMonth : null,
      });
    },

    totalByYearData() {
      return getTotalByYearData({
        dev: this.showDevYear ? this.devByYear : null,
        hml: this.showHmlYear ? this.hmlByYear : null,
        prod: this.showProdYear ? this.prodByYear : null,
      });
    },

    pieTipoData() {
      return getPieTipoData({
        error: this.qtdErrorsByYear,
        warning: this.qtdWarningsByYear,
        debug: this.qtdDebugsByYear,
      });
    },

    currentMonth() {
      return moment().format('MMMM');
    },
  },

  async created() {
    await this.loadLogs();
    this.LineChartConfig = configLineChart();
    this.doughnutConfig = configDoughnutChart();
    this.doneConfig = true;
  },

  methods: {
    ...mapActions('Logs', ['loadLogs']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/style-utils.scss';

.charts-container {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 30px 0px;
}

.chart-box {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  box-shadow: 3px 3px #e6e6e6;
  padding: 20px;
}

.local-container {
  display: flex;
  max-height: inherit;
  @media screen and (max-width: 890px) {
    flex-direction: column;
    .graphicModule {
      width: 100%;
    }
  }
}

.anual-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.filter {
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 890px) {
    justify-content: center;
  }
  &.is-left-align {
    justify-content: flex-start;
  }
}

.month-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transform: rotate(-90deg);
  @media screen and (max-width: 890px) {
    width: 100%;
    transform: rotate(0deg);
  }
}
</style>
