import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    transitionName: 'slide-left',
    userInfo: {}
  },
  mutations: {
    setTransitionName (state, target) {
      state.transitionName = target
    },
    saveUserInfo (state, target) {
      sessionStorage.setItem('iCainBlogUserInfo', JSON.stringify(target))
      state.userInfo = target
    },
    dropUserInfo (state) {
      sessionStorage.removeItem('iCainBlogUserInfo')
      state.userInfo = {}
    }
  }
})

export default store
