/* eslint-disable */
import * as types from '../../mutation-types'
import { getUrl } from '../../../config/urlConfig'
import { getRequest, postRequest } from '../../../services/request'
export default {
  async setPageTextDataAction({ commit, state, rootState }, data) {
    commit('SET_PAGE_TEXT_DATA_ACTION', data)
  },

  async getListAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'getListUrl')
    try {
      const result = await getRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },

  async getDetailAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'getDetailUrl')
    try {
      const result = await getRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },

  async deleteListAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'deleteListUrl')
    try {
      const result = await getRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },

  async saveDataAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'saveDataUrl')
    try {
      const result = await postRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },

  //  保存服务端活动配置
  async saveServerAcAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'saveServerAcUrl')
    try {
      const result = await postRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },

  //  服务端活动列表
  async getServerAcAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'getServerAcUrl')
    try {
      const result = await getRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },
  async getServerDetailUrlAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'getServerDetailUrl')
    try {
      const result = await getRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },
  async unionInfoAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'unionInfoUrl')
    try {
      const result = await getRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },
  async userInfoAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'userInfoUrl')
    try {
      const result = await getRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },
  async loginAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'loginUrl')
    try {
      const result = await postRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  },
  async toSendLinkAction({ commit, state, rootState }, data) {
    commit('IS_SHOW_LOADING', true)
    const url = getUrl('base', 'sendLinkUrl')
    try {
      const result = await postRequest(url, data)
      commit('IS_SHOW_LOADING', false)
      return result
    } catch (e) {
      commit('IS_SHOW_LOADING', false)
      return null
    }
  }
}
