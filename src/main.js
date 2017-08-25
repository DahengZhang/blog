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
import Popup from '@/components/Popup'
import {toast, hideToast} from '@/components/Toast'

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

Vue.prototype.Popup = Popup
Vue.prototype.toast = toast
Vue.prototype.hideToast = hideToast
Vue.prototype.$http = Axios
Vue.prototype.BScroll = BScroll
Vue.prototype.Moment = window.Moment = Moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
