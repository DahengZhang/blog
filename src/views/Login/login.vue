<template>
  <div id="login">
    <v-header :title="title"></v-header>
    <div class="content-wrapper">
      <div class="content position-raletive">
        <transition name="login-fade">
          <div v-show="pageSign === 'login'" class="login control-item position-absolute display-flex full-screen flex-center flex-direction-column">
            <div class="account input-wrapper display-flex position-raletive">
              <span class="icon icon-user"></span>
              <input v-model="login.account" class="input phone" type="number" placeholder="请输入手机号">
            </div>
            <div class="password input-wrapper display-flex position-raletive">
              <span class="icon icon-key2"></span>
              <input v-model="login.password" class="input password" type="password" placeholder="请输入密码">
            </div>
            <button @click="loginF" class="buttom">登录</button>
            <div class="to-other register"><span @click="changeControl('register')" class="text">前往注册</span>></div>
          </div>
        </transition>
        <transition name="register-fade">
          <div v-show="pageSign === 'register'" class="register control-item position-absolute display-flex full-screen flex-center flex-direction-column">
            <div class="account input-wrapper display-flex position-raletive">
              <span class="icon icon-user"></span>
              <input v-model="register.account" class="input phone" type="number" placeholder="请输入手机号">
            </div>
            <div class="password input-wrapper display-flex position-raletive">
              <span class="icon icon-key2"></span>
              <input v-model="register.password" class="input password" type="password" placeholder="请输入密码">
            </div>
            <div class="password input-wrapper display-flex position-raletive">
              <span class="icon icon-key2"></span>
              <input v-model="register.confirm" class="input confirm" type="password" placeholder="确认入密码">
            </div>
            <button @click="registerF" class="buttom">注册</button>
            <div class="to-other login"><<span @click="changeControl('login')" class="text">返回登录</span></div>
          </div>
        </transition>
      </div>
      <div class="footer position-raletive">
        @Copyright 张大亨 2017~2027
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
        register: {
          account: '',
          password: '',
          confirm: ''
        }
      }
    },
    methods: {
      changeControl (targetPage) {
        this.pageSign = targetPage
      },
      registerF () {
        if (this.register.account === '' || this.register.password === '' || this.register.confirm === '') {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '请填写完整'})
          return
        }
        if (this.register.password !== this.register.confirm) {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '两次密码不一致'})
          return
        }
        this.$Http.post('http://192.168.241.15:3000/api/user/register', {phone: this.register.account, password: this.register.password}).then(response => {
          if (response.data.status !== 1) {
            this.$Toast({iConClass: 'icon-cross', waiting: false, tip: response.data.message})
            return
          }
          this.register = {
            account: '',
            password: '',
            confirm: ''
          }
          this.pageSign = 'login'
          this.$Toast({iConClass: 'icon-checkmark', waiting: false, tip: '注册成功'})
        }).catch(response => {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '发生错误'})
        })
      },
      loginF () {
        if (this.login.account === '' || this.login.password === '') {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '请填写完整'})
          return
        }
        this.$Http.get('http://192.168.241.15:3000/api/user/login', {params: {phone: this.login.account, password: this.login.password}}).then(response => {
          if (response.data.status !== 1) {
            this.$Toast({iConClass: 'icon-cross', waiting: false, tip: response.data.message})
            return
          }
          this.saveUserInfo(response.data.value)
          this.$Toast({iConClass: 'icon-checkmark', waiting: false, tip: '登录成功'})
          this.$router.back()
        }).catch(response => {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '发生错误'})
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
    .content {
      width: 100%;
      height: calc(100% - 45px);
      .control-item {}
      .input-wrapper {
        width: 250px;
        height: 45px;
        align-items: center;
        .icon {
          font-size: 22px;
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
        .input {
          flex: 1;
          height: 22px;
        }
        &::after {
          position: absolute;
          content: " ";
          right: 0;
          bottom: 7px;
          left: 30px;
          height: 1px;
          background-color: #CCCCCC;
          transform: scaleY(0.5);
        }
      }
      .buttom {
        width: 220px;
        height: 32px;
        border: 0;
        border-radius: 16px;
        margin: 20px 0 45px;
      }
      .to-other {
        width: 220px;
        .text {
          font-size: 12px;
        }
      }
      .register {
        text-align: right;
      }
      .login {
        text-align: left;
      }
    }
    .footer {
      width: 100%;
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      text-align: center;
      &::before {
        position: absolute;
        content: " ";
        top: 0;
        right: 10px;
        left: 10px;
        height: 1px;
        background-color: #CCCCCC;
        transform: scaleY(0.5);
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
