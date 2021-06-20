<template>
  <div :class="getTagClasses">
    {{ $t(tournament) }}
  </div>
</template>

<script>
export default {
  name: 'TournamentTag',
  props: {
    tournament: { type: String, default: '' },
  },
  computed: {
    getTagClasses() {
      const tagColor = this.tournament === 'qualifiers' ? 'is-success' : 'is-link'
      return `tag ${tagColor} is-light`
    },
  },
}
</script>
