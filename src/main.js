// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './http/index'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(api);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>',
  render: h => h(App)
})

// router.beforeEach((to, from, next) => {
//    // 阻止路由跳转
//   //  if (满足阻止条件时) {
//   //      next(false)
//   //      return false
//   //  }
//    // 如果传入的url中有token，则不必跳转登录页
//    if (window.location.href.indexOf('token') > -1 && window.location.href.indexOf('?') > -1 && (router.mode === 'hash' || router.mode === 'history')) {
//        let params = ''
//        if (router.mode === 'hash') {
//          params = window.location.href.split('#')[1]
//          params = params.split('?')[1]
//        } else {
//          params = window.location.href.split('?')[1]
//        }
//        let paramsArray = params.split('&')
//        let query = Object.create(null)
//        paramsArray.forEach(elem => {
//          let e = elem.split('=')
//          query[e[0]] = e[1]
//        })
//       //  store.commit('userInfo', query)
//        $axios.defaults.headers.Authorization = 'Bearer ' + query.token // 防止登录成功token还是undefined
//        next()
//    } else if (to.path === '/login' || store.state.userInfo.token) {
//      next()
//    } else {
//      next('/login')
//    }
//    return false
// })
