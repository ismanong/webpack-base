import Vue,{ set } from 'vue'
import * as types from './types'

export default {
  [types.AJAX] (state,payload) {
    Vue.set(state, payload.name, payload.data)
  }
}

