/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'
import base from './modules/base/index'
Vue.use(Vuex)

const state = {
  showLoadTip: false,

  errorMessage: {
    msg: '',
    status: false
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    base
  }
})
