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
                <input type="checkbox" />
              </th>
              <th>Level</th>
              <th>Descrição</th>
              <th>Origem</th>
              <th>Data</th>
              <th>Evento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in LogList" :key="log.id">
              <td>
                <input v-model="selectedLogs" :value="log.id" type="checkbox" />
              </td>
              <td>{{ log.level }}</td>
              <td>{{ log.titulo }}</td>
              <td>{{ log.origem }}</td>
              <td>{{ log.data }}</td>
              <td>
                {{ log.frequencia }}
                <button v-if="verifySelectedLog(log.id)">A</button>
                <button
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
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'ListaDeLogs',
  props: {
    LogList: Array,
  },
  data() {
    return {
      selectedLogs: [],
    };
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
  },
};
</script>

<style></style>
