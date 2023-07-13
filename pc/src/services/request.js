/* eslint-disable */
import axios from 'axios'
import store from '../store/index'
axios.defaults.timeout = 30 * 1000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * getRequest => http get
 * @param url
 * @param params
 * @returns {*}
 */
export const getRequest = async (url, params) => {
  let urlStr
  if (!params) params = {}
  if (!params) {
    urlStr = url
  } else {
    urlStr = url + '?' + translateParams(params)
  }
  let parameters = {
    url: urlStr,
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: 'e6d5bb4c61799f3'
    }
  }
  let data = await axios.request(parameters)
  return data.data
}
/**
 * postRequest => http post
 * @param url
 * @param params
 * @returns {*}
 */
export const postRequest = async (url, params) => {
  if (!params) params = {}
  // let _package = localStorage.getItem('pkg') || 'com.rewan.who.ios';
  let parameters = {
    // url: url + '?package=' + _package,
    url: url,
    method: 'post',
    // data: translateParams(params),
    data: params,
    headers: { Accept: 'application/json', Authorization: 'e6d5bb4c61799f3' }
  }
  let data = await axios.request(parameters)
  return data.data
}
/**
 * translate obj params to string with &
 * @param params
 * @returns {string}
 */
export function translateParams(params) {
  let url = ''
  for (let param in params) {
    url += `${param}=${params[param]}&`
  }
  return url.substring(0, url.length - 1)
}
