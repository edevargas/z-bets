<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <div class="file is-link is-boxed">
      <label class="file-label">
        <input @change="onFileChange" type="file" class="file-input" />
        <span class="file-cta">
          <span class="file-label">📤 {{ $t('choose_image') }}</span>
        </span>
        <span class="file-name">{{ fileName || $t('without_selection') }}</span>
      </label>
    </div>

    <div class="title is-5 my-5">{{ $t('voucher_needed') }}</div>
    <div
      v-if="showLinkToMinifyImg"
      class="title is-5 has-text-primary has-background-dark py-2"
      style="width: 100%;"
    >
      🗂 {{ $t('minify_image') }} <a href="https://tinypng.com/" target="_blank">Tinypng</a>
    </div>

    <div class="wrap-buttons">
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
        :disabled="disabled"
        @click="next"
      >
        {{ $t('next') }} →
      </button>
    </div>
  </div>
</template>

<script>
import { validateTypeFile, validateSizeFile } from '~/endpoints/storage'

export default {
  name: 'BetVoucher',
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      voucher: '',
      fileName: '',
      showLinkToMinifyImg: false,
    }
  },
  computed: {
    disabled() {
      return !validateTypeFile(this.voucher)
    },
    isValidSizeFile() {
      return validateSizeFile(this.voucher)
    }
  },
  methods: {
    onFileChange(e) {
      this.voucher = e.target.files[0]
      if (this.disabled) {
        this.showError('file_type_not_allowed')
        return
      }

      if (!this.isValidSizeFile) {
        this.showError('file_exceeds_size')
        this.showLinkToMinifyImg = true
        return
      }

      this.showLinkToMinifyImg = false
      this.fileName = this.voucher.name
    },
    showError(message) {
      this.voucher = this.fileName = ''
      const notification = { type: 'error', body: this.$t(message) }
      this.$nuxt.$emit('show-notification', notification)
    },
    next() {
      const { voucher } = this
      this.$emit('set-voucher', { voucher, folder: 'vouchers' })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-name {
  max-width: unset;
}

.title a {
  text-decoration: underline;
}
</style>