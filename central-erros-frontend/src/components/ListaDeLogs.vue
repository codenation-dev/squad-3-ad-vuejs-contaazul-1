<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-6">
        <button>ARQUIVAR</button>
        <button @click="onClickDeleteListLog">DELETAR</button>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-narrow">
        <table class="table">
          <thead>
            <tr>
              <th>
                <input
                  v-model="selectedLogs"
                  @click="checkAll()"
                  type="checkbox"
                  aaaaaaaaaaaaaaaaaaaaaaaaaa
                />
              </th>
              <th>Level</th>
              <th>Descrição</th>
              <th>Origem</th>
              <th>Data</th>
              <th>Evento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in LogList" :key="log.id">
              <td>
                <input
                  v-model="selectedLogs"
                  @change="updateCheckall"
                  :value="log.id"
                  type="checkbox"
                />
              </td>
              <td>{{ log.level }}</td>
              <td>{{ log.titulo }}</td>
              <td>{{ log.origem }}</td>
              <td>{{ log.data }}</td>
              <td>{{ log.frequencia }}</td>
              <td>
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
                  aaaaaaaaa
                >
                  <span>D</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="selectedLogDetails"
      class="modal"
      :class="activeModal ? 'is-active' : ''"
      aaaaaaaaaaaaaaaaaaaa
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Detalhes</p>
          <button
            @click="activeModal = false"
            class="delete"
            aria-label="close"
            aaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
      isCheckAll: false,
    };
  },
  computed: {
    ...mapGetters('Logs', ['logsIds']),
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
      this.isCheckAll = !this.isCheckAll;
      this.selectedLogs = [];
      if (this.isCheckAll) {
        this.selectedLogs = this.logsIds;
      }
    },
    updateCheckall: function() {
      if (this.selectedLogs.length == this.LogList.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
  },
};
</script>

<style></style>
