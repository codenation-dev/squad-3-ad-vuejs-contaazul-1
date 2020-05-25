<template>
  <div class="page">
    <h1 class="title">Dashboard</h1>
    <div class="charts-container">
      <div class="is-width-40 chart-box">
        <total-by-local
          :chart-data="totalByLocalData"
          :options="totalByLocalConfig"
        />
      </div>
      <div class="is-width-40 chart-box">
        <total-by-tipo
          :chart-data="totalByTipoData"
          :options="totalByTipoConfig"
        />
      </div>
    </div>
    <div class="charts-container chart-padding">
      <div class="chart-box is-width-80 anual-container">
        <div class="is-width-60 local-container">
          <year-filter />
          <total-by-year
            :chart-data="totalByYearData"
            :options="totalByYearConfig"
          />
        </div>
        <div class="pie-chart">
          <pie-tipo :chart-data="pieTipoData" :options="pieTipoConfig" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TotalByLocal from './charts/total-by-local/view';
import TotalByTipo from './charts/total-by-tipo/view';
import TotalByYear from './charts/total-by-year/view';
import PieTipo from './charts/pie-tipo/view';
import YearFilter from './year-filter';
import { getTotalByLocalData } from './charts/total-by-local/data';
import { getTotalByTipoData } from './charts/total-by-tipo/data';
import { getTotalByYearData } from './charts/total-by-year/data';
import { getPieTipoData } from './charts/pie-tipo/data';
import { configChart } from '@/utils/chart';

export default {
  name: 'Dashboard',

  components: {
    TotalByLocal,
    TotalByTipo,
    TotalByYear,
    PieTipo,
    YearFilter,
  },

  data() {
    return {
      totalByLocalConfig: {},
      totalByLocalData: {},
      totalByTipoData: {},
      totalByTipoConfig: {},
      totalByYearData: {},
      totalByYearConfig: {},
      pieTipoData: {},
      pieTipoConfig: {},
    };
  },

  computed: {
    ...mapGetters('Logs', [
      'qtdTotal',
      'qtdLogsProducao',
      'qtdLogsHml',
      'qtdLogsDev',
      'qtdErrors',
      'qtdWarnings',
      'qtdDebugs',
      'devByYear',
      'hmlByYear',
      'prodByYear',
    ]),
  },

  async created() {
    await this.loadLogs();
    this.totalByLocalConfig = configChart('Registros por ambiente');
    this.totalByLocalData = getTotalByLocalData({
      prod: this.qtdLogsProducao,
      hml: this.qtdLogsHml,
      dev: this.qtdLogsDev,
    });
    this.totalByTipoConfig = configChart('Registros por tipo');
    this.totalByTipoData = getTotalByTipoData({
      error: this.qtdErrors,
      warning: this.qtdWarnings,
      debug: this.qtdDebugs,
    });
    this.totalByYearConfig = configChart('Registros no ano');
    this.totalByYearData = getTotalByYearData({
      dev: this.devByYear,
      hml: this.hmlByYear,
      prod: this.prodByYear,
    });
    this.pieTipoData = getPieTipoData({ error: 35, warning: 78, debug: 22 });
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
}

.chart-box {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  box-shadow: 3px 3px #e6e6e6;
  padding: 20px;
}

.chart-padding {
  padding: 30px 0px 50px 0px;
}

.local-container {
  display: flex;
  flex-direction: column;
}

.anual-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
