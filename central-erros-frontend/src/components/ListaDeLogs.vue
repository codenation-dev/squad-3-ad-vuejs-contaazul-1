<template>
  <div>
    <div class="grid-container mb-1em">
      <div class="is-width-60">
        <div class="row">
          <div class="col-100">
            <div class="row">
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

    <div class="grid-container">
      <div class="is-width-60 border-table">
        <div class="row gray-default p-table">
          <div class="col-3">
            <label class="person-checkbox">
              <input :value="isCheckAll" @click="checkAll" type="checkbox" />
              <span class="checkbox"></span>
            </label>
          </div>
          <div class="col-15">Level</div>
          <div class="col-15">Descrição</div>
          <div class="col-15">Origem</div>
          <div class="col-15">Data</div>
          <div class="col-15">Evento</div>
          <div class="col-6"></div>
        </div>
        <div
          class="row hand-pointer p-table "
          v-for="log in LogList"
          :key="log.id"
        >
          <div class="col-3">
            <label class="person-checkbox">
              <input
                class="hand-pointer"
                v-model="selectedLogs"
                :value="log.id"
                type="checkbox"
              />
              <span class="checkbox"></span>
            </label>
          </div>
          <div
            class="col-15 label-level"
            @click="onClickDetails(log)"
            :class="{
              error: log.level === 'error',
              warning: log.level === 'warning',
            }"
          >
            <div>
              <span>
                {{ log.level }}
              </span>
            </div>
          </div>
          <div class="col-15" @click="onClickDetails(log)">
            {{ log.titulo }}
          </div>
          <div class="col-15" @click="onClickDetails(log)">
            {{ log.origem }}
          </div>
          <div class="col-15" @click="onClickDetails(log)">
            {{ log.data }}
          </div>
          <div class="col-15" @click="onClickDetails(log)">
            {{ log.frequencia }}
          </div>
          <div class="col-6">
            <div class="row jc-center">
              <span
                v-if="verifySelectedLog(log.id)"
                class="hand-pointer"
                title="Arquivar"
                @click="onClickShowActionModal(log.id, 'arquivar')"
              >
                <span class="lnr lnr-enter"></span>
              </span>
              <span
                class="hand-pointer"
                title="Deletar"
                v-if="verifySelectedLog(log.id)"
                @click="onClickShowActionModal(log.id, 'excluir')"
              >
                <span class="lnr lnr-trash"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LogModal from './LogModal';
import ActionModal from './ActionModal';

export default {
  name: 'ListaDeLogs',

  props: {
    LogList: Array,
  },

  components: {
    LogModal,
    ActionModal,
  },

  data() {
    return {
      selectedLogs: [],
      activeModal: false,
      activeActionModal: null,
      selectedLogDetails: null,
      logAction: null,
    };
  },

  computed: {
    ...mapGetters('Logs', ['logsIds']),
    isCheckAll() {
      return this.selectedLogs.length == this.LogList.length;
    },
  },

  methods: {
    ...mapActions('Logs', ['deleteLogs', 'deleteListLogs']),
    onClickShowActionModal(id, action) {
      this.logAction = id;
      this.activeActionModal = action;
    },
    teste(log) {
      return log;
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
    checkAll() {
      !this.isCheckAll
        ? (this.selectedLogs = this.logsIds)
        : (this.selectedLogs = []);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/style-utils.scss';

.column-title {
  font-size: 16px;
  font-weight: 600;
}

.hand-pointer {
  cursor: pointer;
}

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
    width: 65%;
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
</style>
