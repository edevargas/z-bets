<template>
  <div class="is-flex is-align-items-center is-vcentered">
    <a
      href="#"
      v-for="locale in availableLocales"
      :key="locale.code"
      :class="[zButton, 'is-info']"
      @click.prevent.stop="$i18n.setLocale(locale.code)"
    >
      {{ locale.flag }}
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
    availableLocales() {
      return this.$i18n.locales.filter((item) => item.code !== this.$i18n.locale)
    }
  },
}
</script>

<style lang="scss" scoped>
.button {
  height: auto;
  padding: 0 1rem;
  font-size: 1.5rem;
}
</style>