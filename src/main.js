import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import '../static/css/reset.css'
import store from './store'
import 'src/common/scss/utils.scss'
import './common/scss/icon.scss'
import { date } from 'src/filter/date'

// 将axios挂载到Vue原型上
Vue.prototype.$http = axios

// 注册全局过滤器
Vue.filter('date', date)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
