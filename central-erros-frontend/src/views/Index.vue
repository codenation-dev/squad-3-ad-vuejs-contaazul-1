<template>
  <div class="home">
    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/lista-erros">Lista de Erros</router-link> |
      <router-link to="/arquivados">Arquivados</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
