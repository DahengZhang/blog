<template>
  <div id="picture">
    <div class="middle-wrapper position-raletive">
      <div class="picture-wrapper position-absolute">
        <img @click="bigPicture" class="picture" :src="typeof picSrc === 'string'?'http://192.168.241.15:3000/'+picSrc:'http://192.168.241.15:3000/'+picSrc[0]" alt="图">
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
    }
  },
  methods: {
    bigPicture () {
      this.$emit('bigPicture', this.picSrc)
    }
  }
}
</script>

<style lang="scss" scoped>
#picture {
  width: 100%;
  .middle-wrapper {
    width: 100%;
    padding-top: 100%;
    .picture-wrapper {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      .picture {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
