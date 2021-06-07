<template>
  <div>
    <p v-if="title" class="subtitle is-3 mt-1 mb-3">
      {{ $t(title) }} · ({{ items.length }})
    </p>
    <table
      class="table is-hoverable is-striped is-fullwidth vivify fadeIn duration-400"
    >
      <tbody v-if="originalItems">
        <BetItemRow
          v-for="(item, index) in sortedItems"
          :key="index"
          :item="item"
          :user="user"
          :timestamp="timestamp"
        >
          <slot v-bind="{ item }" />
        </BetItemRow>
        <tr v-if="items.length === 0" class="has-text-centered is-size-5">
          {{
            $t("still_no_items")
          }}
        </tr>
      </tbody>
      <tbody v-else>
        <BetGroupedRow
          v-for="(items, index, key) in groupedByScore"
          :key="key"
          :items="items"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
const LIMIT_TO_GROUP = 10

export default {
  name: 'BetsTable',
  components: {
    BetItemRow: () => import('~/components/bets/BetItemRow'),
    BetGroupedRow: () => import('~/components/bets/BetGroupedRow'),
  },
  props: {
    items: { type: [Array, Object], required: true, default: () => [] },
    title: { type: String, default: '' },
    user: Boolean,
    timestamp: Boolean,
  },
  computed: {
    sortedItems() {
      return this.items.sort(this.sorterByScore)
    },
    originalItems() {
      return this.items.length < LIMIT_TO_GROUP
    },
    groupedByScore() {
      const reducer = (acc, value) => {
        const grouper = `score-${value.homeScore}-${value.awayScore}`
        const getBetsArray = [
          ...(acc[grouper] || []),
          value,
        ]

        return {
          ...acc,
          [grouper]: getBetsArray.sort(this.sorterByName),
        }
      }

      return this.sortedItems.reduce(reducer, {})
    },
  },
  methods: {
    sorterByScore(a, b) {
      if (a.homeScore === b.homeScore) {
        return a.awayScore - b.awayScore
      }

      return a.homeScore - b.homeScore
    },
    sorterByName(a, b) {
      const nameA = a?.user?.displayName?.toLowerCase()
      const nameB = b?.user?.displayName?.toLowerCase()
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
    },
  },
}
</script>
