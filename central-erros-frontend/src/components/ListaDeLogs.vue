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
              >
                ARQUIVAR
              </button>
              <button
                class=" button red-default"
                @click="onClickShowActionModal(false, 'excluir todos')"
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
          <div class="col-10">
            <input :value="isCheckAll" @click="checkAll" type="checkbox" />
          </div>
          <div class="col-15">Level</div>
          <div class="col-15">Descrição</div>
          <div class="col-15">Origem</div>

          <div class="col-15">Data</div>
          <div class="col-15">Evento</div>
          <div class="col-15">Ações</div>
        </div>
        <div
          class="row hand-pointer p-table "
          v-for="log in LogList"
          :key="log.id"
        >
          <div class="col-10">
            <input
              class="hand-pointer"
              v-model="selectedLogs"
              :value="log.id"
              type="checkbox"
            />
          </div>
          <div class="col-15" @click="onClickDetails(log)">
            {{ log.level }}
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
          <div class="col-15">
            <div class="row jc-center">
              <button
                v-if="verifySelectedLog(log.id)"
                class="hand-pointer"
                title="Arquivar"
                @click="onClickShowActionModal(log.id, 'arquivar')"
              >
                <span>A</span>
              </button>
              <button
                class="hand-pointer"
                title="Deletar"
                v-if="verifySelectedLog(log.id)"
                @click="onClickShowActionModal(log.id, 'excluir')"
              >
                <span>D</span>
              </button>
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
</style>
