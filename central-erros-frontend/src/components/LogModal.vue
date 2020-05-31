<template>
  <div v-if="log" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Detalhes</p>
        <button
          @click="$emit('close')"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        <h1 class="title">
          Erro no {{ log.origem }} em
          {{ log.data }}
        </h1>
        <div class="columns">
          <div class="column is-8">
            <div>
              <h2 class="subtitle">Título</h2>
              <span>{{ log.titulo }}</span>
            </div>
            <div>
              <h2 class="subtitle">Detalhes</h2>
              <span>{{ log.detalhes }}</span>
            </div>
          </div>
          <div class="column is-4">
            <div>{{ log.level }}</div>
            <div>
              <h2 class="subtitle">Eventos</h2>
              <span>{{ log.frequencia }}</span>
            </div>
            <div>
              <h2 class="subtitle">Coletado por</h2>
              <span>{{ log.tokenUsuario }}</span>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogModal',

  props: {
    log: Object,
  },
};
</script>
