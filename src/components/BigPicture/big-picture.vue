<template>
  <div id="big-picture" ref="bigPictureWrapper">
    <div class="picture-wrapper">
      <div class="picture-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'big-picture'
}
</script>

<style lang="scss" scoped>
#big-picture {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
