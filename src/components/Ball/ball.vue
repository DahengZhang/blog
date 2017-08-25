<template>
  <div id="ball">
    <transition name="marck-fade">
      <div @click="openBall()" v-show="open" class="mack position-fixed full-screen"></div>
    </transition>
    <transition name="controll-fade">
      <ul v-show="open" class="controll-list">
        <router-link to="/publish" tag="li" class="list-item">发布文章 <span class="icon icon-quill"></span></router-link>
        <router-link to="/music" tag="li" class="list-item">听音乐 <span class="icon icon-headphones"></span></router-link>
        <router-link to="/mine" tag="li" class="list-item">我 <span class="icon icon-user"></span></router-link>
      </ul>
    </transition>
    <div @click="openBall()" class="switch-btn position-raletive" :class="{'active': open}">
      <span class="icon icon-wondering position-absolute"></span>
      <span class="icon icon-evil position-absolute"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ball',
    data () {
      return {}
    },
    computed: {
      open () {
        return this.$store.state.markState
      }
    },
    methods: {
      openBall () {
        this.$store.commit('setBall', !this.$store.state.markState)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #ball {
    .mack {
      z-index: -1;
    }
    .controll-list {
      text-align: right;
      margin-bottom: 10px;
      margin-right: 10px;
      .list-item {
        height: 35px;
        line-height: 35px;
      }
    }
    .switch-btn {
      font-size: 0;
      width: 40px;
      height: 40px;
      float: right;
      .icon {
        font-size: 40px;
        right: 0;
        bottom: 0;
        transition: transform .7s, opacity .7s;
      }
      .icon-wondering {
        opacity: 1;
      }
      .icon-evil {
        opacity: 0;
      }
      &.active {
        .icon {
          transform: rotate(360deg);
        }
        .icon-wondering {
          opacity: 0;
        }
        .icon-evil {
          opacity: 1;
        }
      }
    }
  }
  .marck-fade-enter-active, .marck-fade-leave-active {
    transition: all .3s ease;
  }
  .marck-fade-enter, .marck-fade-leave-to {
    opacity: 0;
  }
  .controll-fade-enter-active, .controll-fade-leave-active {
    transition: all .3s ease;
  }
  .controll-fade-enter, .controll-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
