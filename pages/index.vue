<template>
  <div>
    <BackgroundImg image="bleachers.jpg" placeholder="bleachers-min.jpg" />
    <NextGame :next-game="nextGame" class="background-content" />
  </div>
</template>

<script>
import { getNextMatch } from '~/endpoints/matches'

export default {
  name: 'Index',
  components: {
    BackgroundImg: () => import('~/components/BackgroundImg'),
    NextGame: () => import('~/components/NextGame'),
  },
  data() {
    return {
      nextGame: undefined,
    }
  },
  created() {
    getNextMatch()
    // realtime listener
    this.$nuxt.$on('next-match', (detail) => this.nextGame = detail)
  },
  beforeDestroy() {
    this.$nuxt.$off('next-match')
  }
}
</script>