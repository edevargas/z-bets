<template>
  <div class="pb-5">
    <AppNav />
    <Nuxt />
    <AppFooter />

    <BettingModal />
    <Notification />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    AppNav: () => import('~/components/layout/AppNav'),
    AppFooter: () => import('~/components/layout/AppFooter'),
    BettingModal: () => import('~/components/bets/BettingModal'),
    Notification: () => import('~/components/utils/Notification'),
  }
}
</script>
