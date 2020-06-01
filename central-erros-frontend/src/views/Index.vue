<template>
  <div class="home">
    <navbar />
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Home',

  components: {
    Navbar,
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  margin-top: 50px;
}
</style>
