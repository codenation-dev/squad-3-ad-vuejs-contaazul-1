<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-4">
        <input v-model="filterLevel" value="1" type="checkbox" />
        <label for>Produção</label>
        <input v-model="filterLevel" value="2" type="checkbox" />
        <label for>Homologação</label>
        <input v-model="filterLevel" value="3" type="checkbox" />
        <label for>Dev</label>
      </div>
      <div class="column is-4">
        <input type="text" />
      </div>
    </div>
    <lista-de-logs :log-list="logList"></lista-de-logs>
  </div>
</template>

<script>
import ListaDeLogs from '@/components/ListaDeLogs';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ListaDeErros',
  components: {
    'lista-de-logs': ListaDeLogs,
  },
  data() {
    return {
      filterLevel: [],
    };
  },
  async created() {
    await this.loadLogs();
    console.log(this.formatedLogs);
  },
  computed: {
    ...mapGetters('Logs', ['formatedLogs', 'filteredLogs']),
    logList() {
      if (this.filterLevel.length != 0) {
        this.addFilterLevel(this.filterLevel);
        return this.filteredLogs;
      }

      return this.formatedLogs;
    },
  },
  methods: {
    ...mapActions('Logs', ['loadLogs', 'addFilterLevel']),
  },
};
</script>

<style></style>
