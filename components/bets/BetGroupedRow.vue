<template>
  <tr @click="grouped = !grouped">
    <td class="is-size-5">
      <div :class="['bet-info', grouped ? null : 'grouped']">
        <div class="gamblers">
          <template v-for="item in gamblers">
            <Avatar
              :key="'score'+item.uid"
              :user="item"
              :modifier="grouped ? 'grouped' : ''"
              class="avatar vivify fadeIn"
            />
            <span
              v-show="!grouped"
              :key="'name'+item.uid"
              class="vivify fadeIn"
            >
              {{ item.displayName }}
            </span>
          </template>
        </div>
        <div v-show="grouped" class="user-names vivify fadeIn">
          {{ userNames }}
        </div>
        <div class="bet">
          <Match
            :match="referenceItem.match"
            :score="score"
            keep-row
          />
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
const AVATARS_TO_SHOW = 3

export default {
  name: 'BetGroupedRow',
  components: {
    Match: () => import('~/components/bets/Match'),
    Avatar: () => import('~/components/utils/Avatar'),
  },
  props: {
    items: { type: Array, required: true },
  },
  data() {
    return  {
      grouped: true,
    }
  },
  computed: {
    referenceItem() {
      return this.items[0] || {}
    },
    score() {
      const { homeScore, awayScore } = this.referenceItem
      return { homeScore, awayScore }
    },
    itemsToShow() {
      return this.grouped ? AVATARS_TO_SHOW : this.items.length
    },
    gamblers() {
      return this.items
        .map(({ user }) => user)
        .splice(0, this.itemsToShow)
    },
    userNames() {
      const { displayName } = this.referenceItem.user
      const rest = `+${this.items.length - 1}`
      return this.items.length > 1 ? `${displayName}, ${rest}` : displayName
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
$space-left: 0.5rem;

tr {
  cursor: pointer;
}

.bet-info {
  display: grid;
  grid-template-columns: 80px 1fr 50%;
  grid-template-rows: auto;

  .gamblers {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding-left: $space-left;

    .avatar {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .user-names {
      text-align: left;
    }
  }

  .bet {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.grouped {
    grid-template-columns: 1fr 50%;

    .gamblers {
      display: grid;
      grid-template-columns: calc(80px - #{$space-left}) 1fr;
      grid-template-rows: auto;
    }
  }
}

@media (max-width: 767px) {
  .bet-info {
    display: flex;
    flex-wrap: wrap;

    .gamblers {
      width: 80px;
    }

    .bet {
      width: 100%;
    }

    &.grouped {
      .gamblers {
        width: 100%;
      }
    }
  }
}
</style>
