<template>
  <div id="picture">
    <div class="middle-wrapper position-raletive">
      <div class="picture-wrapper position-absolute">
        <img @click.stop="clickPicture" class="picture" :src="typeof picSrc === 'string'?'http://localhost:3000/'+picSrc:'http://localhost:3000/'+picSrc[0]" :onerror="errorSrc" alt="图">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'picture',
  props: {
    picSrc: {
      type: [String, Array],
      required: true
    },
    errorSrc: {
      type: String,
      required: true
    }
  },
  methods: {
    clickPicture () {
      this.$emit('clickPicture', this.picSrc)
    }
  }
}
</script>

<style lang="scss" scoped>
#picture {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  .middle-wrapper {
    width: 100%;
    padding-top: 100%;
    .picture-wrapper {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      .picture {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
