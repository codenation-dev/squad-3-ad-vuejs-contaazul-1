<template>
  <div class="filter-row">
    <div>
      <label class="person-checkbox">
        <input
          type="checkbox"
          :checked="showProdYear"
          @click="setProdYear(!showProdYear)"
        />
        <span class="checkbox"></span>
        Produção
      </label>
    </div>
    <div>
      <label class="person-checkbox">
        <input
          type="checkbox"
          :checked="showHmlYear"
          @click="setHmlYear(!showHmlYear)"
        />
        <span class="checkbox"></span>
        Homologação
      </label>
    </div>
    <div>
      <label class="person-checkbox">
        <input
          type="checkbox"
          :checked="showDevYear"
          @click="setDevYear(!showDevYear)"
        />
        <span class="checkbox"></span>
        Desenvolvimento
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
  @media screen and(max-width: 540px) {
    flex-direction: column;
    align-items: baseline;
    padding-bottom: 20px;
  }
}
</style>
