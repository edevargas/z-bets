<template>
  <div :class="['wrapper mb-0', keepRow ? 'keep-row' : null]">
    <div :class="['team home mb-0', titleClass]">
      {{ match.homeTeam }}
      <img :src="match.homeId | flag" :alt="match.homeId" class="mx-2" />
    </div>
    <div :class="['score mb-0', titleClass]">
      <span v-if="gambling" class="is-4">-</span>
      <span v-else-if="showVersus" class="is-4">vs</span>
      <span v-else>
        {{ betScore ? item.homeScore : match.homeScore }}
        -
        {{ betScore ? item.awayScore : match.awayScore }}
      </span>
    </div>
    <div :class="['team away mb-0', titleClass]">
      <img :src="match.awayId | flag" :alt="match.awayId" class="mx-2" />
      {{ match.awayTeam }}
    </div>
  </div>
</template>

<script>
import { BET_STATUS } from '~/plugins/constants'

export default {
  name: 'Match',
  props: {
    item: { type: Object, required: true, default: () => ({}) },
    betScore: Boolean,
    keepRow: Boolean,
    isTitle: Boolean,
    gambling: Boolean
  },
  computed: {
    titleClass() {
      return this.isTitle ? 'title is-2' : ''
    },
    match() {
      return this.item?.match || {}
    },
    hasScore() {
      return Object.keys(this.score).length
    },
    showVersus() {
      const { match, betScore } = this
      return match.status === BET_STATUS.PENDING && !betScore
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