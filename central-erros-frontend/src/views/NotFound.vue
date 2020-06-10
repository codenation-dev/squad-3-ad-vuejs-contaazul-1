<template>
  <div class="page">
    <div class="content-container">
      <div class="content-title">4 <img src="@/assets/lupa.svg" /> 4</div>
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
    border-radius: 8px;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0px 0px 7px -3px rgba(0, 0, 0, 0.51);
  }
}

.content-title {
  font-size: 64px;
  color: #3e5959;
  position: relative;
  width: 265px;
  display: flex;
  justify-content: space-evenly;
  img {
    width: 85px;
    margin-top: 20px;
    position: absolute;
    margin-left: -12px;
    pointer-events: none;
  }
}

.content-info {
  margin: 20px 0;
}
</style>
