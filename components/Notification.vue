<template>
  <div>
    <div v-show="show" :class="['notification', type]">
      <button class="delete" @click="show = false" />
      {{ body }}
    </div>
  </div>
</template>

<script>
const CLASS_MAPPER = {
  success: 'is-success',
  info: 'is-info',
  warning: 'is-warning',
  error: 'is-danger',
}

export default {
  name: 'Notification',
  data() {
    return {
      show: false,
      body: '',
      type: '',
    }
  },
  created() {
    this.$nuxt.$on('show-notification', ({ type, body }) => {
      this.type = CLASS_MAPPER[type]
      this.body = body
      this.show = true
    })
  },
  watch: {
    show(newVal) {
      if (newVal) {
        setTimeout(() => this.show = false, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
