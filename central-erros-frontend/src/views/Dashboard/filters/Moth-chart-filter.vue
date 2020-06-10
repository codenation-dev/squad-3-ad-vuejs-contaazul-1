<template>
  <div class="filter-row">
    <div>
      <label class="person-checkbox">
        <input
          type="checkbox"
          :checked="showErrorMonth"
          @click="setErrorMonth(!showErrorMonth)"
        />
        <span class="checkbox"></span>
        Error
      </label>
    </div>
    <div>
      <label class="person-checkbox">
        <input
          type="checkbox"
          :checked="showWarningMonth"
          @click="setWarningMonth(!showWarningMonth)"
        />
        <span class="checkbox"></span>
        Warning
      </label>
    </div>
    <div>
      <label class="person-checkbox">
        <input
          type="checkbox"
          :checked="showDebugMonth"
          @click="setDebugMonth(!showDebugMonth)"
        />
        <span class="checkbox"></span>
        Debug
      </label>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'YearFilter',
  computed: {
    ...mapState('Logs', [
      'showErrorMonth',
      'showWarningMonth',
      'showDebugMonth',
    ]),
  },
  methods: {
    ...mapMutations('Logs', [
      'setErrorMonth',
      'setWarningMonth',
      'setDebugMonth',
    ]),
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
