<template>
  <div class="m-t-1">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <div class="field">
            <div class="control">
              <label for="producao" class="checkbox m-r-1">
                <input
                  id="producao"
                  type="checkbox"
                  value="1"
                  v-model="filterLevel"
                />
                Produção
              </label>

              <label for="homologacao" class="checkbox m-r-1">
                <input
                  id="homologacao"
                  type="checkbox"
                  value="2"
                  v-model="filterLevel"
                />
                Homologação
              </label>

              <label for="dev" class="checkbox">
                <input
                  id="dev"
                  type="checkbox"
                  value="3"
                  v-model="filterLevel"
                />
                Dev
              </label>
            </div>
          </div>
        </div>

        <div class="column is-8">
          <div class="field has-addons">
            <div class="control">
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

            <div class="control is-expanded">
              <input v-model="filterSearch" type="text" class="input" />
            </div>
          </div>
        </div>
      </div>

      <lista-de-logs :log-list="logList" v-if="!arquivados"></lista-de-logs>
      <lista-de-logs :log-list="archivedLogList" v-else></lista-de-logs>
    </div>
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
  props: {
    arquivados: Boolean,
  },
  async created() {
    await this.loadLogs();
    await this.loadLogsArchived();
  },
  computed: {
    ...mapGetters('Logs', [
      'formatLogs',
      'filteredLogs',
      'formatLogsArchived',
      'filteredLogsArchived',
    ]),
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
    archivedLogList() {
      this.addFilterColumnArchived({
        column: this.filterColumnListLogs,
        search: this.filterSearch,
      });

      if (this.filterLevel.length != 0) {
        this.addFilterLevelArchived(this.filterLevel);
        return this.filteredLogsArchived;
      }

      return this.formatLogsArchived;
    },
  },
  methods: {
    ...mapActions('Logs', [
      'loadLogs',
      'addFilterLevel',
      'addFilterColumn',
      'loadLogsArchived',
      'addFilterLevelArchived',
      'addFilterColumnArchived',
    ]),
    customLabelName: function(obj) {
      return obj.name;
    },
  },
};
</script>

<style>
.m-t-1 {
  margin-top: 1rem;
}

.m-r-1 {
  margin-right: 1rem;
}

.multiselect__content-wrapper {
  min-width: max-content !important;
}
</style>
