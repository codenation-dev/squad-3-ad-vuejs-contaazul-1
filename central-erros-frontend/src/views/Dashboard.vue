<template>
  <div class="page">
    <h1 class="title">Dashboard</h1>
    <div class="charts-container">
      <div class="is-width-40 chart-box">
        <total-by-local
          v-if="doneConfig"
          :chart-data="totalByLocalData"
          :options="totalByLocalConfig"
        />
      </div>
      <div class="is-width-40 chart-box">
        <total-by-tipo
          v-if="doneConfig"
          :chart-data="totalByTipoData"
          :options="totalByTipoConfig"
        />
      </div>
    </div>
    {{ qtdWarningsByYear }}
    <div class="charts-container chart-padding">
      <div class="chart-box is-width-80 anual-container">
        <div class="is-width-60 local-container">
          <year-filter />
          <total-by-year
            v-if="doneConfig"
            :chart-data="totalByYearData"
            :options="totalByYearConfig"
          />
        </div>
        <div class="pie-chart">
          <pie-tipo
            v-if="doneConfig"
            :chart-data="pieTipoData"
            :options="pieTipoConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import TotalByLocal from './charts/total-by-local/view';
import TotalByTipo from './charts/total-by-tipo/view';
import TotalByYear from './charts/total-by-year/view';
import PieTipo from './charts/pie-tipo/view';
import YearFilter from './Year-chart-filter';
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
      totalByTipoConfig: {},
      totalByYearConfig: {},
      pieTipoConfig: {},
      doneConfig: false,
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
      'qtdErrorsByYear',
      'qtdWarningsByYear',
      'qtdDebugsByYear',
    ]),
    ...mapState('Logs', ['showProdYear', 'showDevYear', 'showHmlYear']),
    totalByYearData() {
      return getTotalByYearData({
        dev: this.showDevYear ? this.devByYear : 10,
        hml: this.showHmlYear ? this.hmlByYear : 10,
        prod: this.showProdYear ? this.prodByYear : 10,
      });
    },

    totalByLocalData() {
      return getTotalByLocalData({
        prod: this.qtdLogsProducao,
        hml: this.qtdLogsHml,
        dev: this.qtdLogsDev,
      });
    },

    totalByTipoData() {
      return getTotalByTipoData({
        error: this.qtdErrors,
        warning: this.qtdWarnings,
        debug: this.qtdDebugs,
      });
    },

    pieTipoData() {
      return getPieTipoData({
        error: this.qtdErrorsByYear,
        warning: this.qtdWarningsByYear,
        debug: this.qtdDebugsByYear,
      });
    },
  },

  async created() {
    await this.loadLogs();
    this.totalByLocalConfig = configChart('Registros por ambiente');
    this.totalByTipoConfig = configChart('Registros por tipo');
    this.totalByYearConfig = configChart('Registros no ano');
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
  max-height: inherit;
}

.anual-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
