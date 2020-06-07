<template>
  <section>
    <b-loading is-full-page :active.sync="isLoading" />
    <div class="grid-container mb-1em">
      <div class="is-width-60">
        <div class="row">
          <div class="col-100">
            <div class="row button-archive-delete">
              <button
                class=" button purple-default mr-1em"
                @click="onClickShowActionModal(false, 'arquivar todos')"
                :disabled="selectedLogs.length == 0"
                v-show="botaoArquivarVisivel"
              >
                ARQUIVAR
              </button>
              <button
                class=" button red-default"
                @click="onClickShowActionModal(false, 'excluir todos')"
                :disabled="selectedLogs.length == 0"
              >
                DELETAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-table
      class="is-width-60 personal-table"
      :data="logList"
      checkable
      :checked-rows.sync="selectedLogs"
      mobile-cards
      paginated
      :per-page="10"
      :current-page.sync="currentPage"
      pagination-position="bottom"
      default-sort-direction="asc"
      sort-icon="chevron-down"
      sort-icon-size="is-small"
      default-sort="data"
      aria-next-label="Próxima Página"
      aria-previous-label="Página Anterior"
      aria-page-label="Página"
      aria-current-label="Página Atual"
    >
      <template slot-scope="props">
        <b-table-column
          field="level"
          sortable
          label="Status"
          width="40"
          class="label-level"
          :class="{
            error: props.row.level === 'error',
            warning: props.row.level === 'warning',
          }"
        >
          <div @click="onClickDetails(props.row)">
            <span>
              {{ props.row.level }}
            </span>
          </div>
        </b-table-column>

        <b-table-column
          field="titulo"
          label="Título"
          sortable
          class="descricao-bloco"
          width="auto"
        >
          <div @click="onClickDetails(props.row)">
            {{ props.row.titulo }}
          </div>
        </b-table-column>

        <b-table-column field="origem" label="Origem" sortable width="40">
          <div @click="onClickDetails(props.row)">
            {{ props.row.origem }}
          </div>
        </b-table-column>

        <b-table-column field="data" label="Data" sortable width="40">
          <div @click="onClickDetails(props.row)">
            {{ props.row.data }}
          </div>
        </b-table-column>

        <b-table-column label="Evento" field="frequencia" sortable width="40">
          <div @click="onClickDetails(props.row)">
            <span>
              {{ props.row.frequencia }}
            </span>
          </div>
        </b-table-column>
        <b-table-column label="Ações" class="action-buttons" width="40">
          <div>
            <span
              class="hand-pointer"
              title="Arquivar"
              v-if="verifySelectedLog(props.row.id) && botaoArquivarVisivel"
              @click="onClickShowActionModal(props.row, 'arquivar')"
            >
              <span class="lnr lnr-enter"></span>
            </span>
            <span
              class="hand-pointer"
              title="Deletar"
              v-if="verifySelectedLog(props.row.id)"
              @click="onClickShowActionModal(props.row, 'excluir')"
            >
              <span class="lnr lnr-trash"></span>
            </span>
          </div>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <span class="icon-ghost icons" size="is-large"></span>
            </p>
            <p>Não há resultados para essa pesquisa</p>
          </div>
        </section>
      </template>
    </b-table>
    <log-modal
      v-if="activeModal"
      :log="selectedLogDetails"
      @close="activeModal = false"
    />
    <action-modal
      v-if="activeActionModal != null"
      :log="logAction"
      :action="activeActionModal"
      @close="activeActionModal = null"
      @continue="onClickAction"
    />
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LogModal from './LogModal';
import ActionModal from './ActionModal';
export default {
  props: {
    logList: Array,
    botaoArquivarVisivel: Boolean,
  },
  components: {
    LogModal,
    ActionModal,
  },

  data() {
    return {
      isPaginated: true,
      currentPage: 1,
      selectedLogs: [],
      activeModal: false,
      activeActionModal: null,
      selectedLogDetails: null,
      logAction: null,
    };
  },

  computed: {
    ...mapState('Logs', ['isLoading']),
    isCheckAll() {
      return this.selectedLogs.length == this.LogList.length;
    },
  },

  methods: {
    ...mapActions('Logs', [
      'arquivarLog',
      'arquivarLogsList',
      'deleteLog',
      'deleteListLogs',
    ]),
    onClickShowActionModal(log, action) {
      this.logAction = log ? log : {};
      this.activeActionModal = action;
    },
    async onClickAction(action) {
      if (this.logAction?.id) {
        if (action === 'excluir') {
          this.deleteLog(this.logAction.id);
        } else {
          this.arquivarLog(this.logAction.id);
        }
      } else {
        if (action === 'excluir todos') {
          await this.deleteListLogs(this.selectedLogs.map(log => log.id));
        } else {
          await this.arquivarLogsList(this.selectedLogs.map(log => log.id));
        }
      }
      this.selectedLogs = [];
      this.activeActionModal = null;
      this.logAction = null;
    },
    verifySelectedLog(idLog) {
      return !this.selectedLogs.find(log => idLog == log.id);
    },
    onClickDetails(log) {
      this.selectedLogDetails = log;
      this.activeModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/style-utils.scss';
.label-level {
  > div {
    display: flex;
    justify-content: center;
  }
  span {
    color: $blue-system;
    background: $lightblue-system;
    border-radius: 4px;
    padding: 2px 4px;
    display: flex;
    width: 100%;
    justify-content: center;
    line-height: 1;
    box-shadow: 0px 0px 5px 0px;
  }
  &.warning {
    span {
      color: $brown-system;
      background: $lightyellow-system;
    }
  }
  &.error {
    span {
      color: $red-system;
      background: $lightred-system;
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
.action-buttons {
  > div {
    display: flex;
    justify-content: space-evenly;
    cursor: default !important;
    span {
      cursor: pointer;
    }
  }
  @media screen and (max-width: 768px) {
    > div {
      width: 100%;
      justify-content: space-evenly !important;
      &::before {
        display: none;
      }
    }
  }
}

.button-archive-delete {
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
}
.descricao-bloco {
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 22vh;

    @media screen and (max-width: 768px) {
      width: 55vw;
    }
  }
}
</style>
