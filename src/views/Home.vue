<template> <!-- vue实例外创建 -->
  <div class="bgc">
    <navbar class="navbar"></navbar>
    <transition name="fade" appear>
      <div>
        <homeSwiper></homeSwiper>
        <home-Header style="position:sticky;top:0px;background:#fff;z-index: 1;" class="home-header"></home-Header>
        <transition name="fade">
            <router-view />
        </transition>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
  $master_color:#ff5f16;
  $line: 1px solid #ededed;
  // *{margin: 0;padding: 0;}
  // .banner{background-color: red;width: 100%;height: 400px;}
  // ul{
  //   list-style: none;
  //   display: flex;
  //   height: 40px;
  //   line-height: 40px;
  //   margin-top: 10px;
  //   position: sticky;
  //   // .dddd{
  //   //   width: 57px;
  //   //   height: 2px;
  //   //   position: absolute;
  //   //   bottom: 0;
  //   //   left: 0;
  //   //   background-color: #ff5f16;
  //   //   transition: .2s;
  //   // }
  // }
  // ul > li{
  //   flex: 1;
  //   text-align: center;
  //   color: #191a1b;
  //   border-bottom: 1px solid #ededed;
  //   cursor: pointer;
  // }
  // .hhh{
  //   border-bottom: #ff5f16 2px solid;
  //   color: #ff5f16;
  // }
  // .aacc-enter-active {
  //     animation: aaa .5s;
  //   }

  // .aacc-leave-active {
  //   animation: aaa .5s reverse;
  // }

  // @keyframes aaa {
  //   0% {
  //     opacity: 0;
  //     transform: translateX(100% + 5%);
  //   }

  //   100% {
  //     opacity: 1;
  //     transform: translateX(400% + 20%);
  //   }
  // }
  .bgc{
    background-color: white;
  }
  .home-header::after{
    content: '';
    display: block;
    clear: both;
  }
  .fade-enter-active, .fade-leave-avtive {
    transition: opacity 1s;
    transition: transform 1s;
  }
  .fade-enter, .fade-leave-to {
      opacity: 0;
      transform: translateY(20px);
  }
</style>

<script>
import homeSwiper from './Home/HomeSwiper'
import homeHeader from './Home/HomeHeader'
import navbar from '../components/navbar' // 导入导航组件
export default {
  // data () {
  //   return {
  //     left: 'transform: translateX(100% + 5%)'
  //   }
  // },
  // methods: {
  //   hotClick () {
  //     this.left = 'transform: translateX(100% + 5%)'
  //     console.log(this.left)
  //   },
  //   comingClick () {
  //     this.left = 'transform: translateX(400% + 20%)'
  //     console.log(this.left)
  //   }
  // }
  components: {
    homeSwiper,
    homeHeader,
    navbar
  },
  mounted () {
    // alert('欢迎您')
  }
}
</script>
