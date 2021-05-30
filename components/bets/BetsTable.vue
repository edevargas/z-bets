<template>
  <table
    class="table is-hoverable is-striped is-fullwidth vivify fadeIn duration-400"
  >
    <tbody>
      <BetItemRow
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :user="user"
        :timestamp="timestamp"
        :keep-row="keepRow"
      >
        <slot v-bind="{ item }" />
      </BetItemRow>
      <tr v-if="items.length === 0" class="has-text-centered is-size-5">
        {{
          $t("still_no_items")
        }}
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'BetsTable',
  components: {
    BetItemRow: () => import('~/components/bets/BetItemRow'),
  },
  props: {
    items: { type: [Array, Object], required: true, default: () => [] },
    user: Boolean,
    timestamp: Boolean,
    keepRow: Boolean,
  },
}
</script>
