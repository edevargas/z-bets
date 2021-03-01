<template>
  <div>
    <AppNavAdmin />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  components: {
    AppNavAdmin: () => import('~/components/layout/AppNavAdmin')
  }
}
</script>
