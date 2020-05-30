<template>
  <div>
    <div class="buttons">
      <button class="button is-link">Arquivar</button>
      <button class="button is-danger">Deletar</button>
    </div>

    <table class="table is-narrow is-fullwidth">
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
          <th>&nbsp;</th>
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
          </td>
          <td>
            <div class="buttons">
              <button class="button">A</button>
              <button class="button">D</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
