<template>
  <tr>
    <td class="is-size-5">
      <div v-if="timestamp" class="bet-timestamp">
        {{ item.timestamp.toDate() | formatDate }}
      </div>
      <div class="bet-info">
        <div v-if="user" class="user">
          <Avatar :user="item.user" />
          {{ item.user.displayName }}
        </div>
        <div class="bet">
          <Match
            :match="item.match"
            :score="getScore(item)"
            keep-row
          />
        </div>
        <slot v-bind="{ item }" />
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'BetItemRow',
  components: {
    Match: () => import('~/components/bets/Match'),
    Avatar: () => import('~/components/utils/Avatar'),
  },
  props: {
    item: { type: Object, required: true },
    user: Boolean,
    timestamp: Boolean,
  },
  methods: {
    getScore(item) {
      const { homeScore, awayScore } = item
      return { homeScore, awayScore }
    },
  },
}
</script>

<style lang="scss" scoped>
.bet-timestamp {
  margin-bottom: 0.5rem;
}

.bet-info {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;

  .bet {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .user {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 250px;
  }
}

@media (max-width: 767px) {
  .bet-info {
    display: flex;
    flex-wrap: wrap;

    .match {
      .bet-timestamp {
        margin-bottom: 0;
      }
    }

    .actions {
      padding-right: 0.5rem;
      text-align: right;
    }
  }
}
</style>
