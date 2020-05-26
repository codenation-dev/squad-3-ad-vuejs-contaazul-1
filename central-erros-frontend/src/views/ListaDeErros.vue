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
      <div class="column is-2">
        <vue-multiselect
          v-model="filterColumnListLogs"
          :options="columnListLogs"
          :searchable="false"
          :close-on-select="true"
          :custom-label="customLabelName"
          :show-labels="false"
          placeholder="Buscar por"
        ></vue-multiselect>
      </div>
      <div class="column is-2">
        <input v-model="filterSearch" type="text" />
      </div>
    </div>
    <lista-de-logs :log-list="logList"></lista-de-logs>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import ListaDeLogs from '@/components/ListaDeLogs';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ListaDeErros',
  components: {
    'lista-de-logs': ListaDeLogs,
    'vue-multiselect': Multiselect,
  },
  data() {
    return {
      filterLevel: [],
      filterColumnListLogs: null,
      filterSearch: '',
      columnListLogs: [
        {
          id: 0,
          name: 'Level',
        },
        {
          id: 1,
          name: 'Descrição',
        },
        {
          id: 2,
          name: 'Origem',
        },
        {
          id: 3,
          name: 'Data',
        },
        {
          id: 4,
          name: 'Evento',
        },
      ],
    };
  },
  async created() {
    await this.loadLogs();
    console.log(this.formatLogs);
  },
  computed: {
    ...mapGetters('Logs', ['formatLogs', 'filteredLogs']),
    logList() {
      this.addFilterColumn({
        column: this.filterColumnListLogs,
        search: this.filterSearch,
      });
      if (this.filterLevel.length != 0) {
        this.addFilterLevel(this.filterLevel);
        return this.filteredLogs;
      }

      return this.formatLogs;
    },
  },
  methods: {
    ...mapActions('Logs', ['loadLogs', 'addFilterLevel', 'addFilterColumn']),
    customLabelName: function(obj) {
      return obj.name;
    },
  },
};
</script>

<style></style>
