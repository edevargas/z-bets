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
    AppNav: () => import('~/components/layout/AppNav'),
    Notification: () => import('~/components/utils/Notification')
  }
}
</script>
