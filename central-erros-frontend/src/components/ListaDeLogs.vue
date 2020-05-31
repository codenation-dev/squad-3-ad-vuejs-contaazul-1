<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-half">
        <button>ARQUIVAR</button>
        <button @click="onClickDeleteListLog">DELETAR</button>
      </div>
    </div>
    <div class="grid-container">
      <div class="is-width-80">
        <div class="columns column-title">
          <div class="column is-1">
            <input :value="isCheckAll" @click="checkAll" type="checkbox" />
          </div>
          <div class="column is-2">Level</div>
          <div class="column is-2">Descrição</div>
          <div class="column is-2">Origem</div>

          <div class="column is-2">Data</div>
          <div class="column is-1">Evento</div>
          <div class="column is-2">Ações</div>
        </div>
        <div class="columns hand-pointer" v-for="log in LogList" :key="log.id">
          <div class="column is-1">
            <input
              class="hand-pointer"
              v-model="selectedLogs"
              :value="log.id"
              type="checkbox"
            />
          </div>
          <div class="column is-2" @click="onClickDetails(log)">
            {{ log.level }}
          </div>
          <div class="column is-2" @click="onClickDetails(log)">
            {{ log.titulo }}
          </div>
          <div class="column is-2" @click="onClickDetails(log)">
            {{ log.origem }}
          </div>
          <div class="column is-2" @click="onClickDetails(log)">
            {{ log.data }}
          </div>
          <div class="column is-1" @click="onClickDetails(log)">
            {{ log.frequencia }}
          </div>
          <div class="column is-2">
            <button
              v-if="verifySelectedLog(log.id)"
              class="hand-pointer"
              title="Arquivar"
            >
              <span>A</span>
            </button>
            <button
              class="hand-pointer"
              title="Deletar"
              v-if="verifySelectedLog(log.id)"
              @click="onClickDeleteLog(log.id)"
            >
              <span>D</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <log-modal
      v-if="activeModal"
      :log="selectedLogDetails"
      @close="activeModal = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LogModal from './LogModal';

export default {
  name: 'ListaDeLogs',

  props: {
    LogList: Array,
  },

  components: {
    LogModal,
  },

  data() {
    return {
      selectedLogs: [],
      activeModal: false,
      selectedLogDetails: null,
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
    onClickDeleteLog(id) {
      this.deleteLogs({ id });
    },
    onClickDeleteListLog() {
      this.deleteListLogs(this.selectedLogs);
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

.grid-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.column-title {
  font-size: 16px;
  font-weight: 600;
}

.hand-pointer {
  cursor: pointer;
}
</style>
