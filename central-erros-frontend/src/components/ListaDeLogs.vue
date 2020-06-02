<template>
  <div>
    <div class="grid-container mb-1em">
      <div class="is-width-60">
        <div class="row">
          <div class="col-100">
            <div class="row">
              <button class=" button red-default mr-1em">ARQUIVAR</button>
              <button
                class=" button purple-default"
                @click="onClickDeleteListLog"
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
        <div class="row gray-default p-table ">
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

.column-title {
  font-size: 16px;
  font-weight: 600;
}

.hand-pointer {
  cursor: pointer;
}
</style>
