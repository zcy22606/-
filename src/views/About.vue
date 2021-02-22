<template> <!-- vue实例外创建 -->
    <div>
        <navbar></navbar>
        <div class="container">
          <div class="avatar">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2104112279,2006138027&fm=26&gp=0.jpg" alt="">
            <div>{{this.username}}</div>
          </div>
          <ul class="order">
            <li><i class="iconfont icon-wodedingdan"></i><span>电影订单</span></li>
            <li><i class="iconfont icon-dingdantongji"></i><span>商品订单</span></li>
          </ul>
          <div class="mycard">
            <card left="优惠券" rightIcon="iconfont icon-guanbi" color="#ff8462" leftIcon="iconfont icon-kaquan"></card>
            <card left="组合红包" rightIcon="iconfont icon-guanbi" color="#BEA882" leftIcon="iconfont icon-hongbao"></card>
            <card left="余额" rightIcon="iconfont icon-guanbi" color="#ffb437" leftIcon="iconfont icon-xinbaniconshangchuan-" right="￥0"></card>
            <card left="设置" rightIcon="iconfont icon-guanbi" color="#B9CC53" leftIcon="iconfont icon-shezhi"></card>
          </div>
        </div>
    </div>
</template>

<script>
import navbar from '../components/navbar'
import card from '../components/card'
export default {
  data () {
    return {
      username: ''
    }
  },
  components: {
    navbar,
    card
  },
  mounted () {
    if (localStorage.getItem('abc')) {
      this.username = localStorage.getItem('abc')
      console.log(this.username)
    }
  }
}
</script>

<style lang="scss" scoped>
  $master_color:#ff5f16;
  $line: 1px solid #ededed;
  // .container{
  //   // background-color: #fff;
  // }
  .avatar{
    height: 150px;
    background: url(https://assets.maizuo.com/h5/v5/public/app/img/bg.a5bdd690.png);
    background-size: cover;
    margin-top: -44px;
    text-align: center;
    padding-left: 22px;
    padding-top: 64px;
    display: flex;
    align-items: center;
    color: white;
    img{
      width: 63px;
      height: 63px;
      border-radius: 35px;
      border: 2px solid #fff;
      margin-right: 20px;
    }
  }
  .mycard{
    margin-top: 10px;
  }
  .order{
    height: 80px;
    display: flex;
    background-color: #fff;
    li{
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      // justify-content: space-between;
      align-items: center;
      i{
        font-size: 22px;
        flex: 1;
        line-height: 50px;
      }
      span{
        font-size: 13px;
        flex: 1;
        line-height: 10px;
      }
    }
  }
  .icon-wodedingdan{
    color: #ffc82f;
  }
  .icon-dingdantongji{
    color: #C6DA5C;
  }
</style>
