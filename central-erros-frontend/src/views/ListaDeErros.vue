<template>
  <div>
    <div class="grid-container mt-3em ">
      <div class="is-width-60">
        <div class="row">
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
            <multiselect
              v-model="filterColumnListLogs"
              :options="columnListLogs"
              :searchable="false"
              :close-on-select="true"
              :preselect-first="true"
              :custom-label="customLabelName"
              :show-labels="false"
              placeholder="Buscar por"
            />
          </div>
          <div class="col-25">
            <input class="input" v-model="filterSearch" type="text" />
          </div>
        </div>
      </div>
    </div>
    <lista-de-logs :log-list="logList"></lista-de-logs>
    <paginate
      :total-elements="totalLogs"
      :current-page="currentLogPage"
      @change-page="onPageChange"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import ListaDeLogs from '@/components/ListaDeLogs';
import Paginate from '@/components/Paginate';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'ListaDeErros',
  components: {
    ListaDeLogs,
    Multiselect,
    Paginate,
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
  },
  computed: {
    ...mapGetters('Logs', ['formatLogs', 'filteredLogs', 'totalLogs']),
    ...mapState('Logs', ['currentLogPage']),

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
    ...mapMutations('Logs', ['setCurrentLogPage']),

    customLabelName: function(obj) {
      return obj.name;
    },

    onPageChange(page) {
      this.setCurrentLogPage(page);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/style-utils.scss';
</style>
