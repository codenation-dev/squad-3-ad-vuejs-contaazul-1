<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
@import '~bulma';
$size: 70px;
$position: 50%;

#app {
  font-family: 'Open Sans', sans-serif;
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
