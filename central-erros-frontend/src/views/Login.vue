<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <div class="box">
              <h1 class="title">
                Central de erros
              </h1>
              <div class="field">
                <label for class="label">Usuário</label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    v-model="user.username"
                    placeholder="Digite aqui"
                    class="input"
                    @keyup.enter="onSubmit"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for class="label">Senha</label>
                <div class="control has-icons-left">
                  <input
                    v-model="user.password"
                    type="password"
                    placeholder="*******"
                    class="input"
                    @keyup.enter="onSubmit"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <button
                  v-if="isLogin"
                  @click="onSubmit()"
                  class="button is-info is-fullwidth"
                >
                  Login
                </button>
                <button
                  v-else
                  @click="onSubmit()"
                  class="button is-info is-fullwidth"
                >
                  Cadastrar
                </button>
              </div>
              <div v-if="isLogin" class="field">
                <a @click="setIsLogin(false)">
                  Criar uma conta
                </a>
              </div>
              <div v-else class="field">
                <a @click="setIsLogin(true)">
                  Voltar
                </a>
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
      user: {},
    };
  },
  name: 'App',
  methods: {
    ...mapActions('User', ['login', 'create']),
    onSubmit() {
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
        .catch(() => (this.user.password = ''));
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
};
</script>
