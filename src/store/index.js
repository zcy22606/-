import Vue from 'vue'
import Vuex from 'vuex'
import CinemaModule from './module/CinemaModule'
import CityModule from './module/CityModule.js'
import DistrictModule from './module/DistrictModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    CinemaModule,
    CityModule,
    DistrictModule
  }
})
