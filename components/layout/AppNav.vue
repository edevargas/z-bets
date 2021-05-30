<template>
  <nav
    class="navbar is-dark"
    role="navigation"
    aria-label="main navigation"
    v-click-outside="onClickOutside"
  >
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item"> Z-Bets </nuxt-link>
      <SwitchLanguage />

      <a
        role="button"
        class="navbar-burger burger"
        data-target="navbar"
        @click="active = !active"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" :class="['navbar-menu vivify fadeInTop duration-300', active ? 'is-active' : null]">
      <div class="navbar-start">
        <nuxt-link to="/fixture" class="navbar-item">
          {{ $t("fixture") }}
        </nuxt-link>

        <template v-if="user">
          <nuxt-link to="/bets" class="navbar-item">
            {{ $t("realtime_bets") }}
          </nuxt-link>
          <nuxt-link to="/user/my-bets" class="navbar-item">
            {{ $t("my_bets") }}
          </nuxt-link>
        </template>

        <template v-if="isAdmin">
          <nuxt-link v-if="matchAccess('bets_history')" to="/admin/bets-history" class="navbar-item">
            🔐 Admin
          </nuxt-link>
        </template>

        <nuxt-link to="/faq" class="navbar-item">
          {{ $t("faq") }}
        </nuxt-link>
      </div>

      <div
        class="navbar-end is-flex is-align-items-center is-justify-content-flex-end px-2"
      >
        <button
          v-if="!user"
          type="button"
          :class="[zButton, 'is-primary mb-0']"
          @click="logIn"
        >
          {{ $t("log_in") }}
        </button>
        <template v-else>
          {{ username }}
          <Avatar :user="user" class="mr-4" />
          <button
            type="button"
            :class="[zButton, 'is-danger mb-0']"
            @click="logOut"
          >
            {{ $t("log_out") }}
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { logIn, logOut } from '~/endpoints/auth'
import vClickOutside from 'v-click-outside'

export default {
  name: 'AppNav',
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    Avatar: () => import('~/components/utils/Avatar'),
    SwitchLanguage: () => import('~/components/utils/SwitchLanguage')
  },
  data() {
    return {
      active: false,
      zButton: this.$nuxt.context.env.Z_BUTTON
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    username() {
      return this.user?.displayName?.split(' ').shift() || ''
    },
    isAdmin() {
      if (!this.user) {
        return false
      }

      return this.user.adminAccess
    }
  },
  created() {
    this.$nuxt.$on('close-nav', () => this.active = false)
  },
  methods: {
    logIn,
    logOut,
    matchAccess(path) {
      const accessRegex = new RegExp(this.user.adminAccess)
      return path.match(accessRegex)
    },
    onClickOutside() {
      this.active = false
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar-menu {
  background: #363636;

  .navbar-item {
    color: #fff;

    &:hover {
      background-color: #121212;
    }
  }
}

@media (max-width: 1023px) {
  #navbar {
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.8);
  }
}
</style>
