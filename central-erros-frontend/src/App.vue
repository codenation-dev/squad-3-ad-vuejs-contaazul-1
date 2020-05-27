<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home </router-link>|
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/lista-erros">Lista de Erros</router-link> |
      <router-link to="/arquivados">Arquivados</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',

  created() {
    this.login({ username: 'admin', password: 'Admin@123' });
  },

  methods: {
    ...mapActions('User', ['login']),
  },
};
</script>

<style lang="scss">
@import '~bulma';
$size: 70px;
$position: 50%;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

div,
section {
  &.loading {
    position: relative;

    &::after {
      @extend %loader;
      position: absolute;
      z-index: 999;
      border-width: 5px;
      width: $size;
      height: $size;
      top: $position;
      left: $position;
      margin-left: -$size / 2;
      margin-top: -$size / 2;
    }
  }
}
</style>
