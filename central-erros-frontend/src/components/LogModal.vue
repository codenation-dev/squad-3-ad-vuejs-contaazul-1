<template>
  <div v-if="log" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <button @click="$emit('close')" class="close-modal" aria-label="close">
          x
        </button>
        <div class="details-log right-side">
          <div>
            <h1 class="title">
              Erro no {{ log.origem }} em <span>{{ log.data }}</span>
            </h1>
            <div
              class="col-15 label-level"
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
          <div class="info-log-details">
            <div>
              <h2 class="subtitle">Título:</h2>
              <span>{{ log.titulo }}</span>
            </div>
            <div>
              <h2 class="subtitle">Detalhes</h2>
              <span>{{ log.detalhes }}</span>
            </div>
          </div>
        </div>
        <hr class="vertical-hr" />
        <div class="details-log left-side">
          <div class="info-log-details">
            <div>
              <h2 class="subtitle">Eventos</h2>
              <span>{{ log.frequencia }}</span>
            </div>
            <div>
              <h2 class="subtitle">Coletado por</h2>
              <span>{{ log.tokenUsuario }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogModal',

  props: {
    log: Object,
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/style-utils.scss';
.vertical-hr {
  background: #b8b8b8;
  width: 3px;
  border-radius: 100%;
  margin: 0 9px;
  height: 80%;
}
.details-log {
  > div {
    text-align: left;

    &.info-log-details {
      > div {
        padding: 10px 0px;
      }
    }
  }
  .title {
    font-size: 25px;
    font-weight: 300;

    span {
      font-weight: 400;
    }
  }
  .subtitle {
    font-size: 15px;
    font-weight: 400;
    margin: 0;
    ~ span {
      font-size: 15px;
      font-weight: 300;
    }
  }
}

.modal-card {
  width: 70vw;
  height: 70vh;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Open Sans', sans-serif;
  background: white;
  transition: all 0.4s;
  .border-table {
    border: none;
    border-radius: unset;
  }
  .modal-card-body {
    display: flex;
    flex-direction: row;
    flex: auto;
    height: 100%;
    align-items: center;
    padding: 10px;
    margin: 20px;
    > div {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      justify-content: center;
      overflow-wrap: break-word;
      &.details-log {
        width: 100%;

        &.left-side {
          width: 40%;
          padding-right: 10px;
          height: 100%;
          overflow: auto;
          .info-log-details {
            height: 100%;
          }
        }

        &.right-side {
          overflow: auto;
          justify-content: flex-start;
          height: 100%;
        }
      }
    }
    .close-modal {
      position: absolute;
      top: 0;
      right: 5px;
      font-size: 20px;
      font-weight: 400;
      font-family: 'Open Sans', sans-serif;
      border: navajowhite;
      background: no-repeat;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.4s;
      &:hover {
        opacity: 1;
        transition: all 0.4s;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    width: 80vw;
    height: 90vh;
    transition: all 0.4s;

    .modal-card-body {
      flex-direction: column;
      display: block;

      > div {
        overflow: initial;
      }
      .vertical-hr {
        height: 3px;
        width: 80%;
        margin: auto;
      }
      .details-log {
        height: auto !important;
        &.left-side {
          width: 100% !important;
        }
      }
      .label-level {
        span {
          width: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    width: 90vw;
  }
}
.label-level {
  > div {
    display: flex;
    justify-content: initial;
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
