<template>
  <div class="paginate-container">
    <div class="paginate">
      <div
        style="cursor: pointer;"
        :disabled="currentPage === 1"
        @click="$emit('change-page', 1)"
      >
        Inicio
      </div>
      <div class="pages">
        <div v-for="page in pagesToShow" :key="page">
          <div
            class="page-box"
            :class="{ 'is-current': page === currentPage }"
            @click="onClickPage(page)"
          >
            {{ page }}
          </div>
        </div>
      </div>
      <div
        style="cursor: pointer;"
        :disabled="currentPage === totalPages"
        @click="$emit('change-page', totalPages)"
      >
        Fim
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paginate',

  props: {
    totalElements: Number,
    currentPage: Number,
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalElements / 10);
    },

    pagesToShow() {
      if (this.currentPage > 1 && this.currentPage < this.totalPages) {
        return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
      } else if (this.currentPage === 1) {
        return [this.currentPage, this.currentPage + 1];
      } else {
        return [this.currentPage - 1, this.currentPage];
      }
    },
  },

  methods: {
    onClickPage(page) {
      this.$emit('change-page', page);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/style-utils.scss';

.paginate-container {
  display: flex;
  width: 100%;
  justify-content: center;

  .paginate {
    display: flex;
    width: 60%;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 40px;

    .pages {
      display: flex;
    }
  }
}

.page-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 8px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin-left: 2px;
  margin-right: 2px;
  cursor: pointer;
}

.is-current {
  background-color: #1a2e69;
  color: #fff;
}
</style>
