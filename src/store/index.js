import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    markState: false,
    transitionName: 'slide-left'
  },
  mutations: {
    setBall (state, target) {
      state.markState = target
    },
    setTransitionName (state, target) {
      state.transitionName = target
    }
  }
})

export default store
