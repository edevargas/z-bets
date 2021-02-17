<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item">
        Z-Bets
      </nuxt-link>

      <a role="button" class="navbar-burger burger" data-target="navbar" @click="active = !active">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" :class="['navbar-menu', active ? 'is-active' : null]">
      <div class="navbar-start">
        <nuxt-link to="/history" class="navbar-item">
          History
        </nuxt-link>

        <nuxt-link to="/bets" class="navbar-item">
          Realtime bets
        </nuxt-link>
      </div>

      <div class="navbar-end is-flex is-align-items-center is-flex is-justify-content-flex-end px-2">
        <button v-if="!user" type="button" class="button is-outlined is-rounded is-primary mb-0" @click="login">
          Log in
        </button>
        <template v-else>
          {{ user.displayName }}
          <img :src="user.photoURL" :alt="user.displayName" class="avatar image is-32x32 ml-2 mr-4">
          <button type="button" class="button is-outlined is-rounded is-danger mb-0" @click="logOut">
            Log out
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { login, logOut } from '~/endpoints/auth'

export default {
  name: 'AppNav',
  data() {
    return {
      active: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    login,
    logOut,
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
}

.navbar-menu {
  background: #363636;

  .navbar-item {
    color: #fff;
  }
}
</style>
