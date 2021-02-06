import Vue from 'vue' // 导入Vue
import App from './App.vue' // 导入App
import router from './router' // 导入路由
import '../public/iconfont/iconfont.css'
import '../public/scss/index.scss'
import store from './store'
Vue.config.productionTip = false

new Vue({
  router, // 引入路由
  store,
  render: h => h(App)
}).$mount('#app')
