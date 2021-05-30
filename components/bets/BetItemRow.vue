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
          <Match :match="item.match" :score="getScore(item)" :keep-row="keepRow" />
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
    Avatar: () => import('~/components/utils/Avatar'),
  },
  props: {
    item: { type: Object, required: true },
    user: Boolean,
    timestamp: Boolean,
    keepRow: Boolean,
  },
  methods: {
    getScore(item) {
      const { homeScore, awayScore } = item
      return { homeScore, awayScore }
    },
  }
}
</script>

<style lang="scss" scoped>
.bet-timestamp {
  margin-bottom: 0.5rem;
}

.bet-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  .bet {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .user {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .actions {
    min-width: 200px;
    text-align: right;
  }
}

@media (max-width: 767px) {
  .bet-info {
    flex-direction: column;

    .match {
      width: 100%;

      .bet-timestamp {
        margin-bottom: 0;
      }
    }

    .actions {
      min-width: 100%;
      margin-top: -0.5rem;
    }
  }
}
</style>
