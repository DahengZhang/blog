import Vue from 'vue'
import Axios from 'axios'
import BScroll from 'better-scroll'
import Moment from 'moment'

import App from './App'
import router from './router'
import store from './store'

import '&/css/reset'
import '&/css/mixin'
import '&/css/public'
import '&/css/icon'

import Header from '@/components/Header/header'
import Picture from '@/components/Picture/picture'
import Scroll from '@/components/Scroll/scroll'

import Popup from '@/components/Popup'
import {ShowToast, HideToast} from '@/components/Toast'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (from.meta.back) {
    store.commit('setTransitionName', 'slide-right')
  } else {
    store.commit('setTransitionName', 'slide-left')
  }
  next()
})

Vue.component('vHeader', Header)
Vue.component('vPicture', Picture)
Vue.component('vScroll', Scroll)

// 公共组件
Vue.prototype.$Popup = Popup
Vue.prototype.$Toast = ShowToast
Vue.prototype.$HideToast = HideToast

// Axios 三方Ajax请求插件
Vue.prototype.$Http = window.$Http = Axios
// Better-Scroll 三方滚动插件
Vue.prototype.$BScroll = BScroll
// Moment 三方时间格式化插件
Vue.prototype.$Moment = window.$Moment = Moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
