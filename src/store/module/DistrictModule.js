const module = {
  namespaced: true,
  state: {
    selected: '全城',
    isWhich: '',
    district: []
  },
  mutations: {
    setSelectDistrict (state, data) {
      state.selected = data
    },
    setDistrict (state, data) {
      state.district = data
    },
    clearSelectDistrict (state) {
      state.selected = '全城'
    },
    setIsWhich (state, data) {
      state.isWhich = data
    },
    clearIsWhich (state) {
      state.isWhich = ''
      // console.log('我改变了状态')
    }
  }
}

export default module
