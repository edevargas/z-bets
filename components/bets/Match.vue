<template>
  <div :class="['wrapper mb-0', keepRow ? 'keep-row' : null]">
    <div :class="['team home mb-0', titleClass]">
      {{ match.homeTeam }}
      <img :src="match.homeFlag" :alt="match.homeId" class="mx-2" />
    </div>
    <div :class="['score mb-0', titleClass]">
      <span v-if="gambling" class="is-4">-</span>
      <span v-else-if="showVersus" class="is-4">vs</span>
      <span v-else>
        {{ hasScore ? score.homeScore : match.homeScore }}
        -
        {{ hasScore ? score.awayScore : match.awayScore }}
      </span>
    </div>
    <div :class="['team away mb-0', titleClass]">
      <img :src="match.awayFlag" :alt="match.awayId" class="mx-2" />
      {{ match.awayTeam }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Match',
  props: {
    match: {
      type: Object,
      required: true,
      default: () => ({})
    },
    score: {
      type: Object,
      default: () => ({})
    },
    keepRow: Boolean,
    isTitle: Boolean,
    gambling: Boolean
  },
  computed: {
    titleClass() {
      return this.isTitle ? 'title is-2' : ''
    },
    hasScore() {
      return Object.keys(this.score).length
    },
    showVersus() {
      const { match, hasScore } = this
      return match.status === 'pending' && !hasScore
    }
  }
}
</script>

<style lang="scss" scoped>
$score-width: 46px;

.wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.team {
  display: flex;
  min-width: 250px;

  &.home {
    justify-content: flex-end;
  }

  &.away {
    justify-content: flex-start;
  }

  img {
    width: 40px;
    border-radius: 0.5rem;
    object-fit: contain;
  }
}

.score {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: $score-width;
}

@media (max-width: 767px) {
  .team {
    min-width: calc(50% - #{$score-width} / 2);
  }

  .wrapper {
    &:not(.keep-row) {
      flex-direction: column;

      .team {
        justify-content: center;

        &.home {
          flex-direction: row-reverse;
        }
      }
    }

    &.keep-row {
      justify-content: center;
      padding: 1rem 0;
    }
  }
}
</style>