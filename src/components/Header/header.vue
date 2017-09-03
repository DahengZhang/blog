<template>
  <div id="header">
    <span v-if="back" @click="goBack()" class="icon icon-arrow-left2 position-absolute"></span>
    <v-picture v-if="header" :picSrc="user" @clickPicture="clickPicture" class="user position-absolute"></v-picture>
    <span class="title">{{title}}</span>
    <span @click="control" v-if="showSendBtn" class="icon position-absolute" :class="btnClass"></span>
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
        default: true
      },
      showSendBtn: {
        type: Boolean,
        default: false
      },
      btnClass: {
        type: String,
        default: null
      },
      header: {
        type: Boolean,
        default: false
      },
      user: {
        type: String,
        default: ''
      }
    },
    computed: {},
    methods: {
      goBack () {
        this.$router.back()
      },
      control () {
        this.$emit('controlEvent')
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
    background-color: #FFFFFF;
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
    .user {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      top: 5px;
      left: 5px;
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
