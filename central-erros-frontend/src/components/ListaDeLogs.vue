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
        <div class="columns" v-for="log in LogList" :key="log.id">
          <div class="column is-1">
            <input v-model="selectedLogs" :value="log.id" type="checkbox" />
          </div>
          <div class="column is-2">{{ log.level }}</div>
          <div class="column is-2">{{ log.titulo }}</div>
          <div class="column is-2">{{ log.origem }}</div>
          <div class="column is-2">{{ log.data }}</div>
          <div class="column is-1">{{ log.frequencia }}</div>
          <div class="column is-2">
            <button @click="onClickDetails(log)" title="Visualizar">
              <span>V</span>
            </button>
            <button v-if="verifySelectedLog(log.id)" title="Arquivar">
              <span>A</span>
            </button>
            <button
              title="Deletar"
              v-if="verifySelectedLog(log.id)"
              @click="onClickDeleteLog(log.id)"
            >
              <span>D</span>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="selectedLogDetails"
        class="modal"
        :class="activeModal ? 'is-active' : ''"
      >
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Detalhes</p>
            <button
              @click="activeModal = false"
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
            <h1 class="title">
              Erro no {{ selectedLogDetails.origem }} em
              {{ selectedLogDetails.data }}
            </h1>
            <div class="columns">
              <div class="column is-8">
                <div>
                  <h2 class="subtitle">Título</h2>
                  <span>{{ selectedLogDetails.titulo }}</span>
                </div>

                <div>
                  <h2 class="subtitle">Detalhes</h2>
                  <span>{{ selectedLogDetails.detalhes }}</span>
                </div>
              </div>

              <div class="column is-4">
                <div>{{ selectedLogDetails.level }}</div>

                <div>
                  <h2 class="subtitle">Eventos</h2>
                  <span>{{ selectedLogDetails.frequencia }}</span>
                </div>

                <div>
                  <h2 class="subtitle">Coletado por</h2>
                  <span>{{ selectedLogDetails.tokenUsuario }}</span>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot"></footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ListaDeLogs',
  props: {
    LogList: Array,
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
</style>
