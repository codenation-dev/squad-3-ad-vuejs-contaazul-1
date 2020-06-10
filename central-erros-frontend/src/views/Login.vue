<template>
  <section class="hero is-fullheight">
    <b-loading is-full-page :active.sync="isLoading" />
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div
            class="column is-10-tablet is-10-desktop is-8-widescreen bloco-login"
          >
            <div class="box">
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="text"
                    v-model="user.username"
                    placeholder="Usuário"
                    :class="{ input: true, wrong: !!errorMessage }"
                    @keyup.enter="onSubmit"
                    @focus="errorMessage = ''"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="icon-user icons"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    v-model="user.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Senha"
                    :class="{ input: true, wrong: !!errorMessage }"
                    @keyup.enter="onSubmit"
                    @focus="errorMessage = ''"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="icon-key icons"></i>
                  </span>
                  <span class="icon is-small is-right show-pass">
                    <i
                      class="icon-eye icons"
                      :class="{ activePass: showPassword }"
                      @click="showPassword = !showPassword"
                    ></i>
                  </span>
                </div>
              </div>
              <div class="field" v-show="errorMessage">
                <label class="has-text-danger">{{ errorMessage }}</label>
              </div>
              <div class="field">
                <button @click="onSubmit()" class="button primary-btn">
                  {{ buttonTittle }}
                </button>
              </div>
              <div v-if="isLogin" class="field new-account">
                <a @click="isLogin = false">
                  Criar uma conta
                </a>
              </div>
              <div v-else class="field new-account">
                <a @click="isLogin = true">
                  Voltar
                </a>
              </div>
            </div>
            <div class="box">
              <div class="bloco-title">
                <h1 class="title">
                  CENTRAL
                </h1>
                <span>error</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isLogin: true,
      showPassword: false,
      user: {
        password: null,
        username: null,
      },
      errorMessage: '',
      isLoading: false,
    };
  },
  name: 'App',
  methods: {
    ...mapActions('User', ['login', 'create']),
    onSubmit() {
      if (!this.user.username.trim() || !this.user.password.trim()) {
        this.errorMessage = 'Todos os campos são obrigatórios';
        return;
      }

      if (this.user.password?.length < 4) {
        this.errorMessage = 'A senha deve conter no mínino 4 caracteres.';
        return;
      }
      this.isLoading = true;
      let func;

      if (this.isLogin) {
        func = this.login(this.user);
      } else {
        func = this.create(this.user);
      }

      return func
        .then(() => {
          this.$router.push({ name: 'ListaDeErros' });
        })
        .catch(error => {
          this.user.password = '';
          this.errorMessage = error.response.data.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    setIsLogin(flag) {
      this.isLogin = flag;
    },
    onClickCreate() {
      this.create(this.user).then(() => {
        this.$router.push({ name: 'ListaDeErros' });
      });
    },
  },
  computed: {
    buttonTittle() {
      return this.isLogin ? 'Login' : 'Cadastrar';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/style-utils.scss';
.bloco-login {
  font-family: 'Open Sans', sans-serif;
  height: 70vh;
  display: flex;
  flex-direction: row;
  background: $blue-system;
  border-radius: 30px;
  box-shadow: none;
  padding: 0;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    box-shadow: none;
    background: none;
    color: white;
    flex: 1;
    border-radius: 30px;
    align-items: center;
    &:first-child {
      background: white;
      box-shadow: 0px 0px 20px rgba(26, 47, 114, 0.32);
      z-index: 9;
    }
    .title {
      color: white;
    }
    .field {
      width: 75%;
      .icon {
        transition: all 0.4s;
      }
      .show-pass {
        pointer-events: auto;
        cursor: pointer;
        i {
          display: flex;
          justify-content: center;
          align-items: center;

          &::after {
            content: '';
            display: flex;
            height: 0px;
            width: 2px;
            position: absolute;
            transform: rotate(45deg);
            transition: linear 0.2s;
          }

          &.activePass {
            &::after {
              height: 20px;
              background: #dbdbdb;
              transition: linear 0.2s;
            }
          }
        }
      }
    }
    input[type='text'],
    input[type='password'] {
      font-family: 'Open Sans', sans-serif;
      color: $gray-system;
      font-weight: 300;
      border: none;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.16);
      border-radius: 5px;
      font-size: 14px;
      transition: all 0.4s;
      &.wrong {
        color: $red-system;
        box-shadow: 0px 2px 10px 0px rgba(253, 0, 0, 0.33);

        ~ span {
          color: #c11d1d9c;
        }
      }
      &::placeholder {
        color: #dbdbdb;
        transition: all 0.4s;
      }
      &:focus {
        &::placeholder {
          color: $gray-system;
          transition: all 0.4s;
        }
        ~ span i.activePass {
          &::after {
            background: $gray-system;
          }
        }
        &.wrong {
          color: $red-system;
          box-shadow: 0px 2px 10px 0px rgba(253, 0, 0, 0.33);
          ~ span {
            color: $red-system !important;
          }
        }
      }
      &:valid {
        ~ .icon {
          color: $gray-system;
        }
        ~ span i.activePass {
          &::after {
            background: $gray-system;
          }
        }
      }
    }
    .bloco-title {
      position: relative;
      .title {
        text-decoration: none;
        &::after {
          content: '';
          width: 55%;
          height: 3px;
          background: white;
          display: flex;
          margin-top: 6px;
          border-radius: 20px;
        }
      }
      span {
        background: $blue-system;
        position: absolute;
        right: 0;
        top: 31px;
        line-height: 20px;
        font-size: 30px;
        padding-left: 5px;
      }
    }
    .new-account {
      text-decoration: underline;
      position: absolute;
      bottom: 5%;
      font-style: italic;
      font-weight: 300;
    }
  }
  @media screen and (max-width: 573px) {
    flex-direction: column-reverse;
    .box {
      &:first-child {
        flex: auto;
      }
    }
  }
}
</style>
