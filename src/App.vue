<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <keep-alive> -->
        <router-view class="app-view"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
      if (sessionStorage.getItem('iCainBlogUserInfo')) {
        this.$store.commit('saveUserInfo', JSON.parse(sessionStorage.getItem('iCainBlogUserInfo')))
      }
    },
    computed: {
      transitionName () {
        return this.$store.state.transitionName
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .app-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s;
  }
  .slide-left-enter, .slide-right-leave-active {
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    transform: translate(-100%, 0);
  }
</style>
