<template>
  <div>
    <h1 class="title">Aqui será a dashboard</h1>
    {{ errorsByYear }}
    <div class="chart-container">
      <div class="is-width-50">
        <total-by-local
          :chart-data="totalByLocalData"
          :options="totalByLocalConfig"
        />
      </div>
      <div class="is-width-50">
        <total-by-tipo
          :chart-data="totalByTipoData"
          :options="totalByTipoConfig"
        />
      </div>
    </div>
    <div>
      <total-by-year
        :chart-data="totalByYearData"
        :options="totalByYearConfig"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TotalByLocal from './charts/total-by-local/view';
import TotalByTipo from './charts/total-by-tipo/view';
import TotalByYear from './charts/total-by-year/view';
import { getTotalByLocalData } from './charts/total-by-local/data';
import { getTotalByTipoData } from './charts/total-by-tipo/data';
import { getTotalByYearData } from './charts/total-by-year/data';
import { configChart } from '@/utils/chart';

export default {
  name: 'Dashboard',

  components: {
    TotalByLocal,
    TotalByTipo,
    TotalByYear,
  },

  data() {
    return {
      totalByLocalConfig: {},
      totalByLocalData: {},
      totalByTipoData: {},
      totalByTipoConfig: {},
      totalByYearData: {},
      totalByYearConfig: {},
    };
  },

  computed: {
    ...mapGetters('Logs', [
      'qtdLogsProducao',
      'qtdLogsHml',
      'qtdLogsDev',
      'qtdErrors',
      'qtdWarnings',
      'qtdDebugs',
      'errorsByYear',
      'warningsByYear',
      'debugsByYear',
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
      error: this.errorsByYear,
      warning: this.warningsByYear,
      debug: this.debugsByYear,
    });
  },

  methods: {
    ...mapActions('Logs', ['loadLogs']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/style-utils.scss';

.chart-container {
  display: flex;
  width: 100%;
}
</style>
