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
          :rules="[{ pattern: /^[a-zA-Z]\w{5,11}$/, message: '用户名只能由数字字母下划线组成，且只能以字母开头' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入您的密码"
          :rules="[{ pattern: /\w{6,16}$/, message: '密码由8到16位数字字母下划线组成' }]"
        />
        <div class="reginster-info">
          <span @click="login">已有账号，立即登录</span>
        </div>
        <div class="prompt-info" v-show="isShow">{{this.message}}</div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#ff5f16">注册</van-button>
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
import http from '../util/http.js'
import qs from 'qs'

Vue.use(Form).use(Button).use(Field)
export default {
  data () {
    return {
      username: '',
      password: '',
      height: 0,
      message: '',
      isShow: false,
      pattern: ''
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    onSubmit (values) {
      const data = qs.stringify({
        username: this.username,
        password: this.password,
        addTime: new Date().getTime()
      })
      console.log('submit', values)
      http({
        method: 'post',
        url: '/server/reginster.php',
        data: data
      }).then(res => {
        if (res.data.code) {
          this.isShow = true
          this.message = res.data.message
        } else {
          Toast.loading({
            message: '注册成功！',
            forbidClick: true,
            // overlay: true,
            duration: 1000
          })
          this.$router.push('/login')
        }
        Toast.clear()
      })
    }
  },
  mounted () {
    this.height = (document.documentElement.clientHeight || document.body.clientHeight) - 50 + 'px'
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
    left: 4em;
  }
</style>

<style lang="scss">
  .van-field__label{
    margin-right: 0!important;
    width: 4em;
    height: 40px;
    line-height: 40px;
  }
  .van-field__error-message{
    padding-left: 8px;
    font-size: 14px;
  }
  .van-field__control{
    height: 40px;
    padding-left: 8px;
    line-height: 40px;
    position: relative;
    // border-bottom: 1px solid #ededed;
  }
  // .van-field__control::after{
  //   content: "";
  //   display: block;
  //   border-bottom: 1px solid #ededed;
  //   transform: scaleY(.5);
  //   height: 1px;
  //   position: absolute;
  //   right: 0;
  //   color: #ededed;
  //   bottom: 0;
  //   left: 0;
  //   transform-origin: 0 100%;
  // }
</style>
