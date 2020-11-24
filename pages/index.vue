<template>
  <div>
    <NextGame />
    <div class="container">
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