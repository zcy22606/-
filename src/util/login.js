import axios from 'axios'
// import Vue from 'vue'
import { Toast } from 'vant'
const http = axios.create({
  // baseURL: 'http://127.0.0.1',
  timeout: 10000
})

http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '登录中...',
    forbidClick: true,
    // overlay: true,
    duration: 0
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.clear()
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default http
