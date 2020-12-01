<template>
  <div>
    <NextGame />
    <div class="container">
       {{ process.env.DATABASE_URL }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    NextGame: () => import('~/components/NextGame'),
  }
}
</script>