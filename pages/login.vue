<template>
  <div>
    <BackgroundImg image="seats.jpg" placeholder="seats-min.jpg" />
    <main class="background-content hero transparent is-dark has-text-centered">
      <div class="hero-body">
        <h1 class="title is-1 mx-5">¿Are you a Zemogian?</h1>
        <button
          type="button"
          :class="[zButton, 'is-primary mb-0']"
          @click="login"
        >
          Log in
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { login } from '~/endpoints/auth'

export default {
  name: 'Login',
  components: {
    BackgroundImg: () => import('~/components/layout/BackgroundImg')
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON
    }
  },
  methods: {
    login
  }
}
</script>