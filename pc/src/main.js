/* eslint-disable */
import Vue from 'vue'
import App from './App'
import store from './store/index'
import ElementUI from 'element-ui'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css'
// import 'babel-polyfill'
import './assets/styles/index.js'
import 'iview/dist/styles/iview.css'
import VConsole from 'vconsole'

// 本地开发调试注入vConsole
if (location.href.indexOf('debug') > -1) {
  new VConsole()
}

Vue.use(ElementUI, { size: 'mini' })
Vue.config.productionTip = false

new Vue({
  ...App,
  router,
  store
}).$mount('#app')
