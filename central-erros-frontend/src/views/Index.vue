<template>
  <div class="home">
    <navbar />
    <router-view />
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
