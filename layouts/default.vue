<template>
  <div>
    <AppNav />
    <Nuxt />
    <BettingModal />
    <Notification />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    AppNav: () => import('~/components/layout/AppNav'),
    BettingModal: () => import('~/components/bets/BettingModal'),
    Notification: () => import('~/components/utils/Notification'),
  }
}
</script>
