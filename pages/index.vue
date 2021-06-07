<template>
  <div>
    <BackgroundImg image="bleachers.jpg" placeholder="bleachers-min.jpg" />
    <div class="background-content">
      <NextGame />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    BackgroundImg: () => import('~/components/layout/BackgroundImg'),
    NextGame: () => import('~/components/matches/NextGame'),
  },
}
</script>
