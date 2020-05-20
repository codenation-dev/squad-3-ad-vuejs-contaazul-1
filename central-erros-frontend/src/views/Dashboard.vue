<template>
  <div>
    <h1>Aqui será a dashboard</h1>
    <div class="graph-height">
      <total-by-local :chart-data="datacollection" :options="config" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TotalByLocal from './charts/total-by-local/view';
import { data } from './charts/total-by-local/data';
import { configChart } from '@/utils/chart';

export default {
  name: 'Dashboard',

  components: {
    TotalByLocal,
  },

  data() {
    return {
      config: {},
      datacollection: {},
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
    ]),
  },

  async created() {
    await this.loadLogs();
    this.config = configChart('Registros por ambiente');
    this.datacollection = data({
      prod: this.qtdLogsProducao,
      hml: this.qtdLogsHml,
      dev: this.qtdLogsDev,
    });
  },

  methods: {
    ...mapActions('Logs', ['loadLogs']),

    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style lang="scss" scoped>
.graph-height {
  height: 200px;
  width: 600px;
}
</style>
