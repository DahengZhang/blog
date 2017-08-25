<template>
  <div id="header">
    <span @click.once="back()" class="icon icon-arrow-left2 position-absolute"></span>
    <span class="title">{{title}}</span>
    <span @click="control" v-if="showSendBtn" class="icon icon-rocket position-absolute"></span>
  </div>
</template>

<script>
  export default {
    name: 'header',
    props: {
      title: {
        type: String,
        required: true
      },
      showSendBtn: {
        type: Boolean,
        default: false
      }
    },
    computed: {},
    methods: {
      back () {
        this.$router.back()
      },
      control () {
        this.$emit('controlEvent')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #header {
    width: 100%;
    height: 45px;
    line-height: 45px;
    position: relative;
    text-align: center;
    font-size: 0;
    .icon {
      font-size: 24px;
      position: absolute;
      &.icon-arrow-left2 {
        top: 10px;
        left: 15px;
      }
      &.icon-rocket {
        font-size: 18px;
        top: 15px;
        right: 20px;
        &:active {
          color: #CCCCCC;
        }
      }
    }
    .title {
      font-size: 16px;
    }
    &::after {
      position: absolute;
      content: " ";
      right: 0;
      bottom: 0;
      left: 0;
      height: 1px;
      transform: scaleY(.5);
      background-color: #CCCCCC;
    }
  }
</style>
