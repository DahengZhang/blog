<template>
  <div id="header">
    <span v-if="back" @click="$router.back()" class="icon icon-back back position-absolute"></span>
    <v-picture v-if="picture || picture === ''" :picSrc="picture" :errorSrc="'javascript: this.src=\'http://dahengzhang.club/default-header.png\''" @clickPicture="clickPicture" class="picture position-absolute"></v-picture>
    <span class="title">{{title}}</span>
    <span v-if="button || button === ''" @click="clickButton" class="icon button position-absolute" :class="button"></span>
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
      back: {
        type: Boolean,
        default: false
      },
      button: {
        type: String,
        default: null
      },
      picture: {
        type: String,
        default: null
      }
    },
    computed: {},
    methods: {
      clickButton () {
        this.$emit('clickButton')
      },
      clickPicture () {
        this.$emit('clickPicture')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #header {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #81E2CE;
    position: relative;
    text-align: center;
    font-size: 0;
    color: #FFFFFF;
    .icon {
      font-size: 24px;
      position: absolute;
      &.back {
        top: 12px;
        left: 10px;
      }
      &.button {
        top: 12px;
        right: 10px;
      }
      &:active {
        color: #CCCCCC;
      }
    }
    .picture {
      width: 35px;
      height: 35px;
      border: 1px solid #FFFFFF;
      border-radius: 50%;
      top: 4px;
      left: 4px;
    }
    .title {
      font-size: 16px;
    }
  }
</style>
