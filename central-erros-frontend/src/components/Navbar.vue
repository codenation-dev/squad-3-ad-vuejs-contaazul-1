<template>
  <b-navbar class="menu-nav nav-color">
    <template slot="start">
      <b-navbar-item
        v-for="route in routes"
        :key="route.path"
        :class="{
          'current-tab': activeRoute === route.path,
        }"
      >
        <router-link :to="route.path">
          <span class="label">{{ route.name }}</span>
        </router-link>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-dropdown :label="user.email">
        <b-navbar-item href="javascript:void(0)" @click="onLogout">
          Logout
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
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
          name: 'Lista de erros',
          path: '/lista-erros',
        },
        {
          name: 'Arquivados',
          path: '/arquivados',
        },
        {
          name: 'Dashboard',
          path: '/dashboard',
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
@import '@/styles/style-utils.scss';
.menu-nav {
  position: sticky;
  top: 0;
  z-index: 9;
}
.nav-color {
  background-color: #1a2e69;

  @media screen and (min-width: 1024px) {
    padding: 0px 18%;
  }
}
.current-tab a {
  border-bottom: 3px solid #fff;
  transition: all 0.4s;
}

.navbar-item {
  &::after {
    content: '';
    display: flex;
    height: 3px;
    width: 0%;
    background: white;
    position: absolute;
    bottom: 23%;
    transition: all 0.4s;
  }
  &:hover,
  &:focus,
  &:focus-within {
    background: unset;
    outline: none !important;
  }

  &:hover {
    background: unset;
    &::after {
      width: 50%;
      transition: all 0.4s;
    }
    &.current-tab a {
      border-color: transparent;
      transition: all 0.4s;
    }
  }

  @media screen and (max-width: 1023px) {
    .has-text-light {
      color: $blue-system !important;
    }
  }
  @media screen and (min-width: 1024px) {
    &.has-dropdown {
      &:hover {
        background: none;
      }
    }
  }

  &.has-dropdown {
    &:focus,
    &:focus-within {
      outline: none;
    }
  }
}
</style>
