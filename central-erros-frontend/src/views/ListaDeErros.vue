<template>
  <div>
    <div class="grid-container">
      <div class="is-width-60">
        <div class="row check-and-filter">
          <div class="col-50 jc-start">
            <div class="row filter-row">
              <div>
                <label for="prd" class="person-checkbox">
                  <input
                    v-model="filterLevel"
                    class="checkbox"
                    value="1"
                    id="prd"
                    type="checkbox"
                  />
                  <span class="checkbox"></span>
                  Produção
                </label>
              </div>
              <div>
                <label for="hom" class="person-checkbox">
                  <input
                    v-model="filterLevel"
                    class="checkbox"
                    value="2"
                    id="hom"
                    type="checkbox"
                  />
                  <span class="checkbox"></span>
                  Homologação
                </label>
              </div>
              <div>
                <label for="dev" class="person-checkbox">
                  <input
                    v-model="filterLevel"
                    class="checkbox"
                    value="3"
                    id="dev"
                    type="checkbox"
                  />
                  <span class="checkbox"></span>
                  Dev
                </label>
              </div>
            </div>
          </div>
          <div class="col-50 filter-word">
            <div class="mr-1em">
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
            <div>
              <input class="input" v-model="filterSearch" type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <lista-de-logs
      :log-list="arquivados ? archivedLogList : logList"
      :botao-arquivar-visivel="!arquivados"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import ListaDeLogs from '@/components/Table';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'ListaDeErros',
  components: {
    ListaDeLogs,
    Multiselect,
  },
  props: {
    arquivados: Boolean,
  },
  data() {
    return {
      filterLevel: [],
      filterColumnListLogs: null,
      filterSearch: '',
      columnListLogs: [
        {
          id: 0,
          name: 'Status',
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
    if (this.arquivados) {
      this.loadLogsArchived();
    } else {
      this.loadLogs();
    }
  },
  computed: {
    ...mapGetters('Logs', [
      'formatLogs',
      'filteredLogs',
      'totalLogs',
      'formatLogsArchived',
      'filteredLogsArchived',
    ]),
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
.check-and-filter {
  @media screen and (max-width: 768px) {
    flex-direction: column;
    > div {
      width: 100%;
      padding: 5px 0;

      .filter-row {
        justify-content: center;
      }
    }
  }
}
.filter-word {
  flex-direction: row;
  > div {
    &:first-child {
      width: 120px;
    }
    &:nth-child(2) {
      flex: auto;
    }
  }
}
.is-width-60 {
  margin: auto;
  @media screen and (max-width: 1024px) {
    width: 80%;
  }
  @media screen and (max-width: 425px) {
    width: 90%;
  }
}
</style>
