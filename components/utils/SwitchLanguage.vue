<template>
  <div class="is-flex is-align-items-center is-vcentered">
    <a href="#" :class="[zButton, 'is-info']" @click.prevent.stop="switchLang">
      {{ current.flag }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'SwitchLanguage',
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON
    }
  },
  computed: {
    current() {
      const { locales, locale } = this.$i18n
      return locales.find(({ code }) => code === locale)
    }
  },
  methods: {
    switchLang() {
      const { locales } = this.$i18n
      const [newLang] = locales.filter(({ code }) => code !== this.current.code)
      this.$i18n.setLocale(newLang.code)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  height: auto;
  padding: 0 1rem;
  font-size: 1.5rem;
}
</style>