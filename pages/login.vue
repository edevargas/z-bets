<template>
  <div>
    <BackgroundImg image="seats.jpg" placeholder="seats-min.jpg" />
    <main class="background-content hero transparent is-dark has-text-centered">
      <div class="hero-body">
        <h1 class="title is-1 mx-5">
          {{ !user ? '¿Are you a Zemogian?' : `Welcome, ${user.displayName}` }}
        </h1>

        <button v-if="!user" type="button" :class="[zButton, 'is-primary mb-0']" @click="login">
          Log in
        </button>

        <template v-else>
          <nuxt-link to="/bets" :class="[zButton, 'is-info mb-0']">Go to bets</nuxt-link>
          <button type="button" :class="[zButton, 'is-danger mb-0']" @click="logOut">Log out</button>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { login, logOut } from '~/endpoints/auth'

export default {
  name: 'Login',
  components: {
    BackgroundImg: () => import('~/components/BackgroundImg'),
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  methods: {
    login,
    logOut,
  },
}
</script>