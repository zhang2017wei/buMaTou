/* eslint-disable */
import home from './url-config/home'
import store from '../store/index'

const config = Object.assign(home)
export function getUrl(type, path) {
  let env = process.env.NODE_ENV || 'production'
  if (
    window.location.href.indexOf('dev-page.iambanban') > -1 ||
    window.location.href.indexOf('8090') > -1 ||
    window.location.href.indexOf('808') > -1
  ) {
    env = 'development'
  }
  return `${config[type].domain[env]}/${config[type].path[path]}`
}
