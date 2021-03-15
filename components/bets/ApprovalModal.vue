<template>
  <div :class="['modal', open ? 'is-active' : null]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <section class="modal-card-body">
        <img v-if="voucher" :src="voucher" />
        <p v-else-if="error" class="title is-2 my-6 has-text-centered">
          🙁 Image not provided
        </p>
        <progress v-else class="progress is-primary my-6" />
      </section>
      <footer class="modal-card-foot">
        <button :class="[zButton, 'result']" @click="$emit('close')">
          Cancel
        </button>
        <button
          :class="[zButton, 'is-primary result']"
          @click="$emit('approve')"
        >
          Approve
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { getFileUrl } from '~/endpoints/storage'

export default {
  name: 'ApprovalModal',
  props: {
    bet: {
      type: Object,
      required: true,
      default: () => ({})
    },
    open: Boolean
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      voucher: '',
      error: false
    }
  },
  computed: {
    title() {
      return this.bet?.user?.displayName || 'Approving'
    }
  },
  watch: {
    async bet(newVal) {
      if (newVal) {
        console.log('🚀 ~ file: ApprovalModal.vue ~ line 61 ~ bet ~ newVal.id', newVal.id)
        const voucher = await getFileUrl('vouchers', newVal.id)
        if (!voucher) {
          this.error = true
        }

        this.voucher = voucher
      }
    }
  }
}
</script>