<template>
  <div>
    <AppNav />
    <Nuxt />
    <Notification />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    AppNav: () => import('~/components/AppNav'),
    Notification: () => import('~/components/Notification')
  },
}
</script>
