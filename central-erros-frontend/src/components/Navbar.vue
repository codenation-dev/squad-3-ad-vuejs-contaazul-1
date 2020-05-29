<template>
  <div>
    <nav class="navbar nav-color">
      <div class="nav-content">
        <div class="nav-left">
          <div
            v-for="route in routes"
            :key="route.path"
            :class="{
              'current-tab': activeRoute === route.path,
            }"
          >
            <router-link :to="route.path">
              <span class="label has-text-light">{{ route.name }}</span>
            </router-link>
          </div>
        </div>
        <div class="nav-right">
          <div class="dropdown is-right is-active">
            <div class="dropdown-trigger">
              <a @click="showDropdown = !showDropdown">
                <span class="has-text-light">{{ user.email }}</span>
              </a>
            </div>
            <div v-if="showDropdown" class="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a @click="onLogout" class="dropdown-item">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Navbar',

  data() {
    return {
      activeRoute: {},
      showDropdown: false,
      routes: [
        {
          name: 'Dashboard',
          path: '/dashboard',
        },
        {
          name: 'Lista de erros',
          path: '/lista-erros',
        },
        {
          name: 'Arquivados',
          path: '/arquivados',
        },
      ],
    };
  },

  computed: {
    ...mapState('User', ['user']),
  },

  watch: {
    $route(to) {
      this.activeRoute = to.path;
    },
  },

  created() {
    this.activeRoute = this.$router.currentRoute.path;
  },

  methods: {
    ...mapActions('User', ['resetUser']),
    ...mapActions('Logs', ['resetLogs']),
    onLogout() {
      this.resetLogs();
      this.resetUser();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-color {
  background-color: #1a2e69;
}

.label {
  font-weight: bolder;
}

.nav-content {
  display: flex;
  width: 100%;
  justify-content: space-around;

  .nav-left {
    display: flex;
    width: 30%;
    align-items: center;
    justify-content: space-between;
  }

  .nav-right {
    display: flex;
    width: 30%;
    align-items: center;
    justify-content: flex-end;
  }
}

.current-tab {
  border-bottom: 3px solid #fff;
}
</style>
