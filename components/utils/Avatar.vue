<template>
  <img
    :src="user.photoURL"
    :alt="user.displayName"
    :title="user.displayName"
    :class="['avatar image', modifier]"
  />
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    user: { type: Object, default: () => ({}) },
    modifier: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  display: inline-block;
  width: 32px !important;
  height: 32px !important;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  border: 1px solid #fff;
  transition: 0.2s;

  &.grouped {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
}
</style>