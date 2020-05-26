<template>
  <div class="filter-row">
    <div>
      <label class="checkbox">
        <input type="checkbox" checked @click="setProdYear(!showProdYear)" />
        <span class="subtitle is-5">Produção</span>
      </label>
    </div>
    <div>
      <label class="checkbox">
        <input type="checkbox" checked @click="setHmlYear(!showHmlYear)" />
        <span class="subtitle is-5">Homologação</span>
      </label>
    </div>
    <div>
      <label class="checkbox">
        <input type="checkbox" checked @click="setDevYear(!showDevYear)" />
        <span class="subtitle is-5">Desenvolvimento</span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'YearFilter',
  computed: {
    ...mapState('Logs', ['showDevYear', 'showHmlYear', 'showProdYear']),
  },
  methods: {
    ...mapMutations('Logs', ['setProdYear', 'setHmlYear', 'setDevYear']),
  },
};
</script>

<style lang="scss" scoped>
.filter-row {
  display: flex;
  justify-content: space-between;
  width: 60%;
}
</style>
