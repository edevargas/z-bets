<template>
  <progressive-background
    class="background"
    :src="bkg.final"
    :placeholder="bkg.placeholder"
  />
</template>

<script>
export default {
  name: 'BackgroundImg',
  props: {
    image: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      bkg: {}
    }
  },
  created() {
    const { image, placeholder } = this
    this.bkg = {
      final: require(`~/assets/imgs/${image}`),
      placeholder: require(`~/assets/imgs/${placeholder}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss">
.progressive-image-main {
  height: 100%;
}

.background-content {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 0;
  right: 0;
  width: 100%;
  transform: translateY(-50%);
}
</style>