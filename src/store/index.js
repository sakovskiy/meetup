import Vue from 'vue'
import Vuex from 'vuex'

import mettup from './meetup'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetup: mettup,
    user: user,
    shared: shared
  }
})
