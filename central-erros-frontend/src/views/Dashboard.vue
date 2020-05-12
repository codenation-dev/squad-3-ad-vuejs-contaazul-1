<template>
  <div>
    <h1>Aqui será a dashboard</h1>
    <div v-for="log in logs" :key="log.id">
      <div class="log-container">
        <p>ID: {{ log.id }}</p>
        <p>TITULO: {{ log.titulo }}</p>
        <p>DETALHES: {{ log.detalhes }}</p>
        <p>LEVEL: {{ log.level }}</p>
        <p>LOCAL: {{ log.local }}</p>
        <p>ORIGEM: {{ log.origem }}</p>
        <p>FREQUENCIA: {{ log.frequencia }}</p>
        <p>DATA: {{ log.data }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  created() {
    this.loadLogs();
  },
  computed: {
    ...mapGetters('Logs', ['logs']),
  },
  methods: {
    ...mapActions('Logs', ['loadLogs']),
  },
};
</script>

<style lang="scss" scoped>
.log-container {
  margin-bottom: 40px;
}
</style>
