<template>
  <section>
    <div class="grid-container mb-1em">
      <div class="is-width-60">
        <div class="row">
          <div class="col-100">
            <div class="row button-archive-delete">
              <button
                class=" button purple-default mr-1em"
                @click="onClickShowActionModal(false, 'arquivar todos')"
                :disabled="selectedLogs.length == 0"
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
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      aria-next-label="Próxima Página"
      aria-previous-label="Página Anterior"
      aria-page-label="Página"
      aria-current-label="Página Atual"
    >
      <template slot-scope="props">
        <b-table-column>
          <div>
            <label class="person-checkbox">
              <input
                class="hand-pointer"
                v-model="selectedLogs"
                :value="props.row.id"
                type="checkbox"
              />
              <span class="checkbox"></span>
            </label>
          </div>
        </b-table-column>
        <b-table-column
          field="level"
          sortable
          label="Level"
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

        <b-table-column field="titulo" label="Descrição" sortable>
          <div @click="onClickDetails(props.row)">
            {{ props.row.titulo }}
          </div>
        </b-table-column>

        <b-table-column field="origem" label="Origem" sortable>
          <div @click="onClickDetails(props.row)">
            {{ props.row.origem }}
          </div>
        </b-table-column>

        <b-table-column field="data" label="Data" sortable>
          <div @click="onClickDetails(props.row)">
            {{ props.row.data }}
          </div>
        </b-table-column>

        <b-table-column label="Evento" field="frequencia" sortable>
          <div @click="onClickDetails(props.row)">
            <span>
              {{ props.row.frequencia }}
            </span>
          </div>
        </b-table-column>
        <b-table-column label="" class="action-buttons">
          <div>
            <span
              class="hand-pointer"
              title="Arquivar"
              v-if="verifySelectedLog(props.row.id)"
              @click="onClickShowActionModal(props.row.id, 'arquivar')"
            >
              <span class="lnr lnr-enter"></span>
            </span>
            <span
              class="hand-pointer"
              title="Deletar"
              v-if="verifySelectedLog(props.row.id)"
              @click="onClickShowActionModal(props.row.id, 'excluir')"
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
      :action="activeActionModal"
      @close="activeActionModal = null"
      @continue="onClickAction"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LogModal from './LogModal';
import ActionModal from './ActionModal';
export default {
  props: {
    logList: Array,
  },
  components: {
    LogModal,
    ActionModal,
  },

  data() {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'chevron-down',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10,

      selectedLogs: [],
      activeModal: false,
      activeActionModal: null,
      selectedLogDetails: null,
      logAction: null,
    };
  },

  methods: {
    ...mapActions('Logs', ['deleteLogs', 'deleteListLogs']),
    onClickShowActionModal(id, action) {
      this.logAction = id;
      this.activeActionModal = action;
    },
    onClickAction(action) {
      if (this.logAction) {
        if (action === 'excluir') {
          this.deleteLogs({ id: this.logAction });
        } else {
          console.log('Arquivar');
        }
      } else {
        if (action === 'excluir todos') {
          this.deleteListLogs(this.selectedLogs);
        } else {
          console.log('Arquivar todos');
        }
      }

      this.activeActionModal = null;
      this.logAction = null;
    },
    verifySelectedLog(idLog) {
      return !this.selectedLogs.find(id => idLog == id);
    },
    onClickDetails(log) {
      this.selectedLogDetails = log;
      this.activeModal = true;
    },
  },
  computed: {
    ...mapGetters('Logs', ['logsIds']),
    isCheckAll() {
      return this.selectedLogs.length == this.LogList.length;
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
    border: 1.5px solid;
    color: $blue-system;
    background: $lightblue-system;
    border-radius: 8px;
    padding: 2px 4px;
    display: flex;
    width: 100%;
    justify-content: center;
    line-height: 1;
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

.personal-table {
  & td {
    padding: 0;
    > div {
      cursor: pointer;
      padding: 8px 12px;
    }
  }
}
</style>
