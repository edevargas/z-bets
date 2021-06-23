<template>
  <div class="actions">
    <div
      v-if="item.status === MATCH_STATUS.PENDING"
      :class="{ confirming: confirm }"
    >
      <button
        :class="[zButton, 'is-primary action-buttons']"
        @click="action('edit')"
      >
        {{ $t("edit") }}
      </button>
      <button
        v-if="deleteButton"
        :class="[zButton, 'is-danger action-buttons']"
        @click="confirm = true"
      >
        {{ $t("delete") }}
      </button>
    </div>
    <div
      v-if="!confirm"
      :class="{ status: item.status === MATCH_STATUS.PENDING }"
    >
      {{ getStatus(item.status) }}
      <template v-if="item.status === BET_STATUS.WON">
        · {{ $t(item.paid ? "bet_paid" : "bet_pending_payment") }}
      </template>
    </div>
    <div v-else class="vivify flipInX">
      <button :class="[zButton, 'my-1']" @click="confirm = false">
        {{ $t("cancel") }}
      </button>
      <button :class="[zButton, 'is-danger my-1']" @click="action('delete')">
        {{ $t("confirm_deleting") }} 🗑
      </button>
    </div>
  </div>
</template>

<script>
import { MATCH_STATUS, BET_STATUS } from '~/plugins/constants'

export default {
  name: 'BetEditButtons',
  props: {
    item: { type: Object, required: true },
    editButton: Boolean,
    deleteButton: Boolean,
  },
  data() {
    return {
      MATCH_STATUS,
      BET_STATUS,
      zButton: this.$nuxt.context.env.Z_BUTTON,
      confirm: false,
    }
  },
  methods: {
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
    action(value) {
      this.confirm = false
      this.$emit(value)
    },
  },
}
</script>

<style lang="scss" scoped>
.actions {
  min-width: 120px;
  text-align: center;
}

.status {
  display: initial;
}

.action-buttons {
  display: none;
}

.confirming {
  .button.action-buttons {
    display: none;
  }
}

tr:hover {
  .status {
    display: none;
  }

  .action-buttons {
    display: initial;
  }
}

@media (max-width: 767px) {
  .actions {
    min-width: 100%;
    margin-top: -0.5rem;
  }
}
</style>
