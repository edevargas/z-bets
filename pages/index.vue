<template>
  <div class="background" :style="background">
    <NextGame :next-game="nextGame" class="next-game" />
  </div>
</template>

<script>
import { getNextMatch } from '~/endpoints/matches'

export default {
  name: 'Index',
  components: {
    NextGame: () => import('~/components/NextGame'),
  },
  data() {
    return {
      background: null,
      nextGame: undefined,
    }
  },
  created() {
    const stadiumImage = require('~/assets/imgs/bleachers.jpg')
    this.background = { backgroundImage: `url(${stadiumImage})` }
    
    getNextMatch()
    // realtime listener
    this.$nuxt.$on('next-match', (detail) => this.nextGame = detail)
  },
  beforeDestroy() {
    this.$nuxt.$off('next-match')
  }
}
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
}

.next-game {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>