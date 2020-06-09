<template>
  <div class="page">
    <div class="content-container">
      <p class="content-title">404</p>
      <p class="content-info">
        A página que você está buscando não foi encontrada
      </p>
      <div class="button" @click="onVoltar">Voltar</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',

  methods: {
    onVoltar() {
      this.$router.replace({ name: 'ListaDeErros' });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/style-utils.scss';

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    padding: 30px;
    background-color: #fff;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.51);
  }
}

.content-title {
  font-size: 64px;
  color: #1a2e69;
}

.content-info {
  margin-bottom: 20px;
}
</style>
