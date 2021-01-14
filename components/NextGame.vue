<template>
    <section class="hero is-medium is-primary is-bold" :style="background">
        <div class="hero-body">
            <div class="container">
                <h1 class="title has-text-centered my-4">
                    Next Game
                </h1>
                <div class="wrap-teams">
                    <Team team="Colombia" />
                    <div class="has-text-centered">VS</div>
                    <Team team="Brasil" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import stadiumImage from '~/assets/imgs/bleachers.jpg'

export default {
    name: 'NextGame',
    components: {
        Team: () => import('~/components/Team'),
    },
    data() {
      return {
        background: { backgroundImage: `url(${stadiumImage})` },
      }
    },
}
</script>

<style lang="scss" scoped>
.hero {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
}

.wrap-teams {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 100px 1fr;
  column-gap: 1rem;
  align-items: center;
  justify-content: center;
}

h1 {
  text-shadow: 0 0 10px #000;
}
</style>