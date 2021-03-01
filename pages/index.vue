<template>
  <div>
    <BackgroundImg image="bleachers.jpg" placeholder="bleachers-min.jpg" />
    <div class="background-content">
      <Betting v-if="betNow" :match="nextGame" @close="betNow = false" />
      <NextGame v-else :next-game="nextGame" @bet-now="betNow = true" />
    </div>
  </div>
</template>

<script>
import { getNextMatch } from '~/endpoints/matches'

export default {
  name: 'Index',
  components: {
    BackgroundImg: () => import('~/components/layout/BackgroundImg'),
    Betting: () => import('~/components/bets/Betting'),
    NextGame: () => import('~/components/bets/NextGame')
  },
  data() {
    return {
      nextGame: undefined,
      betNow: false
    }
  },
  created() {
    getNextMatch()
    // realtime listener
    this.$nuxt.$on('next-match', (data) => (this.nextGame = data))
  },
  beforeDestroy() {
    this.$nuxt.$off('next-match')
  }
}
</script>