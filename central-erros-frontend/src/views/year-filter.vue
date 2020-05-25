<template>
  <div class="filter-row">
    <div>
      <label class="checkbox">
        <input type="checkbox" />
        <span class="subtitle is-5">Produção</span>
      </label>
    </div>
    <div>
      <label class="checkbox">
        <input type="checkbox" />
        <span class="subtitle is-5">Homologação</span>
      </label>
    </div>
    <div>
      <label class="checkbox">
        <input type="checkbox" />
        <span class="subtitle is-5">Desenvolvimento</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YearFilter',
};
</script>

<style lang="scss" scoped>
.filter-row {
  display: flex;
  justify-content: space-between;
  width: 60%;
}
</style>
