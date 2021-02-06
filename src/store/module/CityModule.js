const module = {
  namespaced: true,
  state: {
    cityId: '110100',
    cityName: '北京'
  },
  mutations: {
    changeCityName (state, name) {
      state.cityName = name
    },
    changeCityId (state, id) {
      state.cityId = id
    }
  },
  actions: {

  }
}

export default module
