<template>
  <div id="login">
    <v-header :title="title" :back="true"></v-header>
    <div class="content-wrapper display-flex flex-center">
      <div class="content position-raletive">
        <img class="rabbit position-absolute" src="../../../static/img/login-rabbit.png" alt="兔子">
        <transition name="login-fade">
          <div v-show="pageSign === 'login'" class="login control-item position-absolute">
            <div class="input-item display-flex position-raletive">
              <span class="icon icon-phone"></span>
              <input v-model="login.account" class="elm-input" type="number" placeholder="请输入手机号码">
            </div>
            <div class="input-item last display-flex position-raletive">
              <span class="icon icon-password"></span>
              <input v-model="login.password" class="elm-input" type="password" placeholder="请输入密码">
            </div>
            <button @click="loginF" class="login elm-button" :class="{active: loginButton}">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
            <div @click="changeControl('register')" class="other">还没有账号？立刻&nbsp;<span class="link">注册</span></div>
          </div>
        </transition>
        <transition name="register-fade">
          <div v-show="pageSign === 'register'" class="register control-item position-absolute">
            <div class="input-item display-flex position-raletive">
              <span class="icon icon-phone"></span>
              <input v-model="register.account" class="elm-input" type="number" placeholder="请输入手机号码">
            </div>
            <div class="input-item display-flex position-raletive">
              <span class="icon icon-password"></span>
              <input v-model="register.password" class="elm-input" type="password" placeholder="请输入密码">
            </div>
            <div class="input-item last display-flex position-raletive">
              <span class="icon icon-password"></span>
              <input v-model="register.confirm" class="elm-input" type="password" placeholder="确认密码">
            </div>
            <button @click="registerF" class="login elm-button" :class="{active: registerButton}">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
            <div @click="changeControl('login')" class="other">已有账号？前往&nbsp;<span class="link">登录</span></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        title: '登录',
        pageSign: 'login',
        login: {
          account: '',
          password: ''
        },
        loginButton: false,
        register: {
          account: '',
          password: '',
          confirm: ''
        },
        registerButton: false
      }
    },
    watch: {
      login: {
        handler (val, oldVal) {
          if (this.login.account !== '' && this.login.password !== '') {
            this.loginButton = true
          } else {
            this.loginButton = false
          }
        },
        deep: true
      },
      register: {
        handler (val, oldVal) {
          if (this.register.account !== '' && this.register.password !== '' && this.register.confirm !== '' && this.register.password === this.register.confirm) {
            this.registerButton = true
          } else {
            this.registerButton = false
          }
        },
        deep: true
      }
    },
    methods: {
      changeControl (targetPage) {
        this.pageSign = targetPage
      },
      registerF () {
        if (this.register.account === '' || this.register.password === '' || this.register.confirm === '') {
          this.$Toast({iConClass: 'icon-false', waiting: false, tip: '请填写完整'})
          return
        }
        if (this.register.password !== this.register.confirm) {
          this.$Toast({iConClass: 'icon-false', waiting: false, tip: '两次密码不一致'})
          return
        }
        this.$Http.post('http://localhost:3000/api/user/register', {phone: this.register.account, password: this.register.password}).then(response => {
          if (response.data.status !== 1) {
            this.$Toast({iConClass: 'icon-false', waiting: false, tip: response.data.message})
            return
          }
          this.register = {
            account: '',
            password: '',
            confirm: ''
          }
          this.pageSign = 'login'
          this.$Toast({iConClass: 'icon-success', waiting: false, tip: '注册成功'})
        }).catch(response => {
          this.$Toast({iConClass: 'icon-false', waiting: false, tip: '发生错误'})
        })
      },
      loginF () {
        if (this.login.account === '' || this.login.password === '') {
          this.$Toast({iConClass: 'icon-false', waiting: false, tip: '请填写完整'})
          return
        }
        this.$Http.get('http://localhost:3000/api/user/login', {params: {phone: this.login.account, password: this.login.password}}).then(response => {
          if (response.data.status !== 1) {
            this.$Toast({iConClass: 'icon-false', waiting: false, tip: response.data.message})
            return
          }
          this.saveUserInfo(response.data.value)
          this.$Toast({iConClass: 'icon-success', waiting: false, tip: '登录成功'})
          this.$router.back()
        }).catch(response => {
          this.$Toast({iConClass: 'icon-false', waiting: false, tip: '发生错误'})
        })
      },
      saveUserInfo (userInfo) {
        this.$store.commit('saveUserInfo', userInfo)
      }
    }
  }
</script>

<style lang="scss" scoped>
#login {
  .content-wrapper {
    background-image: url(../../../static/img/login-background.png);
    background-repeat: no-repeat;
    background-position-x: 0;
    background-position-y: 0;
    background-size: 100%;
    .content {
      background-color: #FFFFFF;
      width: 350px;
      height: 50%;
      margin: 0 auto;
      .rabbit {
        width: 170px;
        top: -115px;
        left: 112px;
      }
      .control-item {
        top: 20px;
        right: 20px;
        left: 20px;
        &.login {}
        &.register {}
        .input-item {
          background-color: #F6F6F6;
          box-sizing: border-box;
          padding: 7px;
          justify-content: flex-start;
          align-items: center;
          .icon {
            font-size: 28px;
            display: inline-block;
            margin: 7px;
            color: #C1C1C1;
          }
          .elm-input {
            flex: 1;
            height: 28px;
            font-size: 15px;
            background-color: transparent;
            &::-webkit-input-placeholder {
              font-size: 15px;
              color: #C1C1C1;
            }
          }
          &::after {
            position: absolute;
            content: " ";
            right: 0;
            bottom: 0;
            left: 10px;
            height: 1px;
            background-color: #CCCCCC;
            transform: scaleY(0.5);
          }
          &.last::after {
            display: none;
          }
        }
        .elm-button {
          width: 100%;
          height: 40px;
          background-color: #D2D2D2;
          border: 0;
          border-radius: 20px;
          margin-top: 50px;
          color: #555555;
          &.active {
            color: #FFFFFF;
            background-color: #81E2CE;
          }
        }
        .other {
          font-size: 12px;
          height: 40px;
          line-height: 40px;
          margin-top: 20px;
          user-select: none;
          .link {
            color: #81E2CE;
          }
        }
      }
    }
  }
}

.login-fade-leave-active, .register-fade-leave-active {
  animation: rotate-leave .5s;
}
.login-fade-enter-active, .register-fade-enter-active {
  animation: rotate-enter .5s;
}

@keyframes rotate-leave {
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
@keyframes rotate-enter {
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
</style>
