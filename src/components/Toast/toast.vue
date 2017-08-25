<template>
  <div id="toast">
    <transition name="toast-fade">
      <div v-show="visible" class="toast-wrapper display-flex flex-center" :class="[waiting?'loading':'tips']">
        <span class="icon" :class="iConClass"></span>
        <h1>{{tip}}</h1>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    iConClass: {
      type: String,
      default: 'icon-notification'
    },
    tip: {
      type: String,
      default: '警告！'
    },
    waiting: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    toast () {}
  }
}
</script>

<style lang="scss" scoped>
#toast {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .toast-wrapper {
    background-color: rgba(0, 0, 0, .5);
    border-radius: 5px;
    color: #FFFFFF;
    &.loading {
      width: 150px;
      height: 150px;
      flex-direction: column;
      .icon {
        font-size: 40px;
        margin-bottom: 20px;
        animation: rotate 1.5s linear infinite;
      }
    }
    &.tips {
      height: 50px;
      padding: 0 20px;
      max-width: 270px;
      .icon {
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
}
@keyframes rotate {
  0%   {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity .5s;
}
.toast-fade-enter, .toast-fade-leave-to {
  opacity: 0;
}
</style>

