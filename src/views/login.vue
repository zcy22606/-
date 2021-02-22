<template>
  <div class="main" :style="{height:height}">
    <div class="container">
      <header>
        <div class="header-log">
          <div class="log">
            <img src="../assets/logo.png" alt="">
          </div>
        </div>
      </header>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="请输入您的用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入您的密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="reginster-info">
          <span @click="reginster">还没有账号，马上去注册</span>
        </div>
        <div class="prompt-info" v-show="isShow">{{this.message}}</div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#ff5f16">登录</van-button>
        </div>
        <!-- <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#ff5f16">登录</van-button>
        </div> -->
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Button, Field, Toast } from 'vant'
import http from '../util/login.js'
import qs from 'qs'

Vue.use(Form).use(Button).use(Field)
export default {
  data () {
    return {
      username: '',
      password: '',
      height: 0,
      message: '用户名或密码错误',
      isShow: false
    }
  },
  methods: {
    reginster () {
      this.$router.push('/reginster')
    },
    onSubmit (values) {
      const data = qs.stringify({
        username: this.username,
        password: this.password
      })
      // console.log('submit', values)
      http({
        method: 'post',
        url: '/server/login.php',
        data: data
      }).then(res => {
        if (res.data.code) {
          this.isShow = true
          this.message = res.data.message
        } else {
          window.localStorage.setItem('abc', this.username)
          Toast({
            message: '登录成功！',
            forbidClick: true,
            // overlay: true,
            duration: 1000
          })
        }
        if (window.localStorage.getItem('abc')) {
          this.$router.push('/About')
          Toast.clear()
        }
      })
    }
  },
  mounted () {
    this.height = (document.documentElement.clientHeight || document.body.clientHeight) + 'px'
  }
}
</script>

<style lang="scss" scoped>
  // body{
  //   // height: 100%;
  //   background-color: white;
  //   height: 100%;
  // }
  .header-log{
    height: 200px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .log{
      width: 80px;
      height: 80px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .main{
    width: 100%;
    // height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    .container{
      height: 100%;
      padding: 0 20px;
    }
    .prompt-info,.reginster-info{
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      color: red;
      padding: 5px 15px;
    }
    .reginster-info{
      span{
        color: gray;
      }
    }
  }
  .van-cell__title{
    margin-right: 0;
  }
  // .footer{
  //   width: 100%;
  //   height: 100px;
  //   background-color: #fff;
  // }
  // .van-form{
  //   background-color: #fff;
  // }
  .van-field{
    padding: 20px 0;
  }
  .van-button{
    margin-top: 100px 0;
  }
  .van-cell::after{
    left: 0;
  }
</style>
