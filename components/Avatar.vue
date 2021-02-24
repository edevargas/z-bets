<template>
  <img :src="user.photoURL" :alt="user.displayName" class="avatar image is-32x32">
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: inline-block;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
}
</style>