<template>
  <div :class="['is-flex is-align-items-center is-justify-content-center', wrapperClasses]">
    <div class="team is-flex is-justify-content-flex-end mb-0" :class="{ 'title is-2' : isTitle }">
      {{ match.homeTeam }}
      <img :src="match.homeFlag" :alt="match.homeTeam" class="mx-2">
    </div>
    <div class="score is-flex is-justify-content-center mb-0" :class="{ 'title is-2' : isTitle }">
      <span v-if="gambling" class="is-4">-</span>
      <span v-else-if="match.status === 'pending'" class="is-4">vs</span>
      <span v-else>{{ match.homeScore }} - {{ match.awayScore }}</span>
    </div>
    <div class="team is-flex is-justify-content-flex-start mb-0" :class="{ 'title is-2' : isTitle }">
      <img :src="match.awayFlag" :alt="match.awayTeam" class="mx-2">
      {{ match.awayTeam }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Match',
  props: {
    wrapperClasses: {
      type: String,
      default: ''
    },
    match: {
      type: Object,
      default: () => ({})
    },
    isTitle: Boolean,
    gambling: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.team {
  min-width: 250px;

  img {
    border-radius: 0.5rem;
    object-fit: contain;
  }
}

.score {
  min-width: 50px;
}

.input {
  min-width: 50px;
  text-align: center;
  padding: 0.5rem;
}
</style>