import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    speed: 30
  },
  mutations: {
    changeSpeed (state, value) {
      state.speed = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
