/* eslint-disable */
export const mutations = {
  IS_SHOW_LOADING(state, data) {
    state.showLoadTip = data
    let _timer = setTimeout(() => {
      state.showLoadTip = false
      clearTimeout(_timer)
    }, 5000)
  },
  SET_ERR_MESSAGE(state, data) {
    state.errorMessage.msg = data.msg
    state.errorMessage.status = data.status
    setTimeout(() => {
      state.errorMessage.msg = ''
      state.errorMessage.status = false
    }, 2000)
  }
}
