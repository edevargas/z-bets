<template>
  <tr :class="[isFinished, previousGames]">
    <td class="is-vcentered is-size-5">
      <div class="info">
        {{ item.city }}
        <button
          v-if="hasBets"
          class="button is-rounded is-small is-primary"
          @click="$emit('show-bets')"
        >
          📋 {{ $t("show_bets") }}
        </button>
        <br />
        {{ item.date.toDate() | formatDate }}
        <div class="tags">
          <span :class="getTagClasses">
            {{ $t(item.tournament) }}
          </span>
          <span v-if="isFinished" class="tag is-light">
            {{ $t("finished") }}
          </span>
        </div>
      </div>
      <Match :match="item" keep-row />      
    </td>
  </tr>
</template>

<script>
import { MATCH_STATUS } from '~/plugins/constants'

export default {
  name: 'MatchRow',
  components: {
    Match: () => import('~/components/matches/Match'),
  },
  props: {
    item: { type: Object, required: true, default: () => ({}) },
    index: { type: Number, required: true },
    previousGames: { type: String, default: '' },
    hidePrevious: Boolean,
  },
  computed: {
    isFinished() {
      return this.hidePrevious && this.item.status === MATCH_STATUS.FINISHED
        ? `is-finished vivify fadeInTop duration-200 delay-${this.index}00`
        : ''
    },
    getTagClasses() {
      const tagColor = this.item.tournament === 'qualifiers' ? 'is-success' : 'is-link'
      return `tag ${tagColor} is-light`
    },
    hasBets() {
      const MATCHES_WITH_BETS = new Date('2021-06-01')
      const { date, status } = this.item

      return status === MATCH_STATUS.FINISHED && date.toDate() > MATCHES_WITH_BETS
    },
  },
}
</script>

<style lang="scss" scoped>
tr {
  transition: 0.2s;

  &.is-finished {
    display: none;

    &.show {
      display: table-row;
      background: #eee;
    }
  }
}

td {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 767px) {
  td {
    flex-direction: column;
  }
}
</style>
