<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-6">
        <button>ARQUIVAR</button>
        <button>DELETAR</button>
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
                <input type="checkbox" />
              </td>
              <td>{{ log.level }}</td>
              <td>{{ log.titulo }}</td>
              <td>{{ log.origem }}</td>
              <td>{{ log.data }}</td>
              <td>
                {{ log.frequencia }}
                <button>A</button>
                <button>D</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaDeLogs',
  props: {
    LogList: Array,
  },
};
</script>

<style></style>
