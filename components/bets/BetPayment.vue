<template>
  <div class="wrap-payment">
    <progress v-if="loading" class="progress is-primary mt-3" />
    <template v-else>
      <button type="button" :class="[zButton, 'is-warning']">
        {{ $t('copy_receiver_number') }}
      </button>

      <div class="title is-5 my-5">
        {{ $t('remember_to_pay') }} {{ betSettings.amount | currency }}
      </div>
      <a
        v-for="(item, key) in paymentSettings"
        :key="key"
        target="_blank"
        :href="item.link"
        :class="[zButton, item.color, 'mx-2']"
      >
        {{ item.name }}
      </a>

      <div class="title is-5 my-5">{{ $t('already_paid') }}</div>
      <button
        type="button"
        :class="[zButton, 'is-danger is-inverted mx-2']"
        @click="$emit('back')"
      >
        ← {{ $t('back') }}
      </button>
      <button
        type="button"
        :class="[zButton, 'is-primary mx-2']"
        @click="$emit('next')"
      >
        {{ $t('next') }} →
      </button>
    </template>
  </div>
</template>

<script>
import { getBetSettings, getPaymentSettings } from '~/endpoints/settings'

export default {
  name: 'BetPayment',
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      betSettings: {},
      paymentSettings: {}
    }
  },
  mounted() {
    getBetSettings()
    getPaymentSettings()
    // realtime listener
    this.$nuxt.$on('bet-settings', (data) => (this.betSettings = data))
    this.$nuxt.$on('payment-settings', (data) => (this.paymentSettings = data))
  },
  computed: {
    loading() {
      return !Object.keys(this.paymentSettings).length
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('bet-settings')
    this.$nuxt.$off('payment-settings')
  }
}
</script>