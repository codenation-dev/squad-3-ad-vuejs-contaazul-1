<template>
  <div class="about">
    <h1>Aqui será a dashboard</h1>
    {{ logs }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  created() {
    this.createLog();
  },
  computed: {
    ...mapGetters('Logs', ['logs']),
  },
  methods: {
    ...mapActions('Logs', ['createLog']),
  },
};
</script>
