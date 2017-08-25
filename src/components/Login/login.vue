<template>
  <div id="login">
    <div class="control-wrapper position-absolute">
      <transition name="login-fade">
        <div v-show="changeState" class="login control-item position-absolute">
          <div class="to-register">前往注册</div>
        </div>
      </transition>
      <transition name="register-fade">
        <div v-show="!changeState" class="register control-item position-absolute">
          <div class="to-login">返回登录</div>
        </div>
      </transition>
    </div>
    <div @click="changeControl" class="copyright position-absolute">
      @Copyright 张大亨 2017~2027
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        pageSign: 'login',
        changeState: true
      }
    },
    methods: {
      changeControl (targetPage) {
        // this.pageSign = targetPage
        this.changeState = !this.changeState
      }
    }
  }
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  min-height: 100%;
  position: relative;
  .control-wrapper {
    top: 10px;
    right: 10px;
    bottom: 50px;
    left: 10px;
    .login {
      top: 0;
      left: 0;
      width: 100%;
      background-color: red;
    }
    .register {
      top: 0;
      left: 0;
      width: 100%;
      background-color: yellow;
    }
  }
  .copyright {
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
    &::before {
      position: absolute;
      content: " ";
      top: 0;
      right: 20px;
      left: 20px;
      height: 1px;
      background-color: #CCCCCC;
      transform: scaleY(0.5);
    }
  }
}

.login-fade-leave-active {
  animation: login-rotate-leave .5s;
}
.login-fade-enter-active {
  animation: login-rotate-enter .5s;
}
@keyframes login-rotate-leave {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(90deg);
  }
}
@keyframes login-rotate-enter {
  0% {
    transform: rotateY(90deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0);
  }
}

.register-fade-leave-active {
  animation: register-rotate-leave .5s;
}
.register-fade-enter-active {
  animation: register-rotate-enter .5s;
}
@keyframes register-rotate-enter {
  0% {
    transform: rotateY(90deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0);
  }
}
@keyframes register-rotate-leave {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(90deg);
  }
}
</style>
