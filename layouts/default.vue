<template>
    <div>
        <AppNav />
        <Nuxt />
    </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    AppNav: () => import('~/components/AppNav')
  },
}
</script>
