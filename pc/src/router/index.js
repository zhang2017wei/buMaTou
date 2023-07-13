/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/views/login'
import setting from '@/components/setting/setting'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: index,
      meta: { title: '首页', keepAlive: true }
    },
    {
      path: '/setting',
      component: setting,
      meta: { title: '配置', keepAlive: false }
    },
    {
      path: '/login',
      component: login
    }
  ]
})
router.beforeEach((to, from, next) => {
  // document.title =  to.meta.title;
  next()
})
export default router
