import http from '../../util/util'
const module = {
  namespaced: true,
  state: {
    cinemaList: [],
    cityCinema: []
  },
  mutations: {
    setCinemaList (state, cinemaList) {
      state.cinemaList = cinemaList
    },
    setCityCinema (state, cityCinema) {
      state.cityCinema = cityCinema
    },
    clearCinemaList (state) {
      state.cinemaList = []
    }
  },
  actions: {
    getCinemaList (store, obj) {
      return http({
        url: `gateway?cityId=${obj.cityId}&ticketFlag=1&k=6051222`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        console.log(obj.selected)
        if (obj.selected === '全城') {
          store.commit('setCinemaList', res.data.data.cinemas)
          store.commit('setCityCinema', res.data.data.cinemas)
        } else {
          const list = res.data.data.cinemas.filter(item => {
            return item.districtName === obj.selected
          })
          console.log(list)
          store.commit('setCinemaList', list)
        }
      })
    }
  }
}

export default module
