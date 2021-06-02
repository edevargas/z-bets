<template>
  <div class="actions">
    <div v-if="item.status === 'pending'" :class="{ confirming: confirm }">
      <button
        v-if="false"
        :class="[zButton, 'is-primary action-buttons']"
        @click="$emit('edit')"
      >
        {{ $t("edit") }}
      </button>
      <button
        :class="[zButton, 'is-danger action-buttons']"
        @click="confirm = true"
      >
        {{ $t("delete") }}
      </button>
    </div>
    <div v-if="!confirm" :class="{ status: item.status === 'pending' }">
      {{ getStatus(item.status) }}
    </div>
    <div v-else class="vivify flipInX">
      <button :class="[zButton, 'my-1']" @click="confirm = false">
        {{ $t("cancel") }}
      </button>
      <button :class="[zButton, 'is-danger my-1']" @click="confirmDelete">
        {{ $t("confirm_deleting") }} 🗑
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BetEditButtons',
  props: {
    item: { type: Object, required: true },
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      confirm: false,
    }
  },
  methods: {
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
    confirmDelete() {
      this.confirm = false
      this.$emit('delete')
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
