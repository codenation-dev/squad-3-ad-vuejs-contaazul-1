<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body border-table">
        <h2 v-html="defineText"></h2>
        <button class="button mr-1em purple-default" @click="onClickAction">
          SIM
        </button>
        <button
          class=" button red-default mr-1em red-default"
          @click="$emit('close')"
        >
          NÃO
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionModal',

  props: {
    action: String,
  },

  computed: {
    defineText() {
      if (this.action === 'excluir') return `Deseja exluir este item?`;

      if (this.action === 'arquivar') return `Deseja arquivar este item?`;

      if (this.action === 'excluir todos')
        return `Deseja excluir todos os itens selecionados?`;

      return `Deseja arquivar todos os itens selecionados?`;
    },
  },

  methods: {
    onClickAction() {
      this.$emit('continue', this.action);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/style-utils.scss';
</style>
