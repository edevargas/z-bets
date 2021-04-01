<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
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


    <div id="navbar" :class="['navbar-menu', active ? 'is-active' : null]">
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
      </div>

      <div
        class="navbar-end is-flex is-align-items-center is-flex is-justify-content-flex-end px-2"
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
          {{ user.displayName }}
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

export default {
  name: 'AppNav',
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
  },
  methods: {
    logIn,
    logOut
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
</style>
