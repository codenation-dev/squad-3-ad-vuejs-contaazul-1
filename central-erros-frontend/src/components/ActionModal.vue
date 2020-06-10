<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body border-table">
        <div>
          <h2 v-html="defineText"></h2>

          <div class="details-log" v-if="log.id">
            <h1 class="title">
              Erro no {{ log.origem }} em <span> {{ logData }}</span>
            </h1>
            <div
              class="label-level"
              :class="{
                error: log.level === 'error',
                warning: log.level === 'warning',
              }"
            >
              <div>
                <span>{{ log.level }}</span>
              </div>
            </div>
          </div>

          <button class="button mr-1em purple-default" @click="onClickAction">
            SIM
          </button>
          <button
            class=" button red-default mr-1em red-default"
            @click="$emit('close')"
          >
            NÃO
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ActionModal',

  props: {
    log: Object,
    action: String,
  },

  computed: {
    defineText() {
      if (this.action === 'excluir') return `Deseja exluir este item?`;

      if (this.action === 'arquivar') return `Deseja arquivar este item?`;

      if (this.action === 'excluir todos')
        return `Deseja excluir todos os itens selecionados?`;

      return `Deseja arquivar todos os itens selecionados?`;
    },

    logData() {
      return moment(this.log.data).format('DD/MM/YYYY HH:mm:ss');
    },
  },

  methods: {
    onClickAction() {
      this.$emit('continue', this.action);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/style-utils.scss';

.details-log {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 30px 0px 40px;
  .title {
    font-size: 20px;
    font-weight: 300;
    margin: 0;
    padding-right: 10px;
    span {
      font-weight: 400;
    }
  }
}

.modal-card {
  align-items: center;
  width: 35vw;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  .modal-card-body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    > div {
      width: 100%;
    }
    h2 {
      padding-bottom: 10px;
      color: #707070;
      font-weight: 400;
      font-size: 20px;
    }
  }
  .border-table {
    border: none;
    border-radius: unset;
  }
}
.red-default {
  margin: 0;
}
.label-level {
  > div {
    display: flex;
    justify-content: center;
    width: 85px;
  }
  span {
    border: 1.5px solid;
    color: $blue-system;
    background: $lightblue-system;
    border-radius: 4px;
    padding: 2px 4px;
    display: flex;
    width: 100%;
    justify-content: center;
    line-height: 1;
  }
  &.warning {
    span {
      color: $brown-system;
      background: $lightyellow-system;
    }
  }
  &.error {
    span {
      color: $red-system;
      background: $lightred-system;
    }
  }
}
</style>
