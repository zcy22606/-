import Vue from 'vue' // 导入Vue
import App from './App.vue' // 导入App
import router from './router' // 导入路由
import '../public/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router, // 引入路由
  render: h => h(App)
}).$mount('#app')
