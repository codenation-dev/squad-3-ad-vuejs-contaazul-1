<template>
  <div>
    <div class="grid-container mt-3em ">
      <div class="is-width-60 row">
        <div class="col-50 jc-start">
          <div class="row">
            <div class="mr-1em">
              <input
                v-model="filterLevel"
                class="checkbox"
                value="1"
                type="checkbox"
              />
              <label for> Produção</label>
            </div>

            <div class="mr-1em">
              <input
                v-model="filterLevel"
                class="checkbox"
                value="2"
                type="checkbox"
              />
              <label for> Homologação</label>
            </div>

            <div>
              <input
                v-model="filterLevel"
                class="checkbox"
                value="3"
                type="checkbox"
              />
              <label for> Dev</label>
            </div>
          </div>
        </div>
        <div class="col-25 mr-1em">
          <vue-multiselect
            v-model="filterColumnListLogs"
            :options="columnListLogs"
            :searchable="false"
            :close-on-select="true"
            :preselect-first="true"
            :custom-label="customLabelName"
            :show-labels="false"
            placeholder="Buscar por"
          ></vue-multiselect>
        </div>
        <div class="col-25">
          <input class="input" v-model="filterSearch" type="text" />
        </div>
      </div>
    </div>

    <lista-de-logs :log-list="logList" v-if="!arquivados"></lista-de-logs>
    <lista-de-logs :log-list="archivedLogList" v-else></lista-de-logs>
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

<style lang="scss">
@import '@/styles/style-utils.scss';
</style>
