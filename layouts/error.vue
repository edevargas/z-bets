<template>
  <div>
    <BackgroundImg image="error-page.jpg" placeholder="error-page-min.jpg" />
    <main class="background-content hero transparent is-dark has-text-centered">
      <div class="hero-body">
        <h1 class="title is-1 mx-5">{{ title }}</h1>
        <nuxt-link to="/" :class="[zButton, 'is-primary']">{{ $t('go_to_home_page') }}</nuxt-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['error'],
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
    }
  },
  computed: {
    title() {
      return this.$t(this.error.statusCode === 404 ? 'page_not_found' : 'error_ocurred')
    },
  },
}
</script>