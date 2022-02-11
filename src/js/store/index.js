import Vue from 'vue'
import Vuex from 'vuex'
import MainStore from './modules/main.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
   MainStore
  }
})
