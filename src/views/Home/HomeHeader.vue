<template>
  <div class="homeHeader">
    <ul>
        <router-link to="/Home/hot" tag="li" active-class="hhh"  @click.native="hotClick">正在热映</router-link>
        <router-link to="/Home/coming" tag="li" active-class="hhh" v-activeS @click.native="comingClick">即将上映</router-link>
        <!-- <transition mode="out-in" name="aacc" appear>
          <div class="dddd" :style="left"></div>
        </transition> -->
        <div class="tab-bar"><span></span></div>
      </ul>
  </div>
</template>

<script>
import Vue from 'vue'
// Vue.directive('activeF', {
//   inserted (el) {
//     const oDiv = document.querySelector('.tab-bar')
//     if (el.classList.contains('hhh')) {
//       oDiv.style.transform = 'translate3d(0%, 0px, 0px)'
//       console.log('我执行了', oDiv.style.transform)
//     }
//   }
// })
Vue.directive('activeS', {
  inserted (el) {
    const oDiv = document.querySelector('.tab-bar')
    if (el.classList.contains('hhh')) {
      oDiv.style.transform = 'translate3d(100%, 0px, 0px)'
      // console.log('我执行了2222222222', oDiv.style.transform)
    }
  }
})
export default {
  methods: {
    hotClick (ev) {
      const oDiv = document.querySelector('.tab-bar')
      setTimeout(() => {
        if (ev.target.classList.contains('hhh')) {
          oDiv.style.transform = 'translate3d(0%, 0px, 0px)'
          // console.log('我执行了44444444444444', oDiv.style.transform)
        }
      }, 100)
    },
    comingClick (ev) {
      const oDiv = document.querySelector('.tab-bar')
      setTimeout(() => {
        if (ev.target.classList.contains('hhh')) {
          oDiv.style.transform = 'translate3d(100%, 0px, 0px)'
          // console.log('我执行了44444444444444', oDiv.style.transform)
        }
      }, 35)
    }
  }
}
</script>

<style lang="scss" scoped>
*{margin: 0;padding: 0;}
  ul{
    list-style: none;
    display: flex;
    height: 50px;
    line-height: 50px;
    // .dddd{
    //   width: 57px;
    //   height: 2px;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   background-color: #ff5f16;
    //   transition: .2s;
    // }
  }
  ul > li{
    flex: 1;
    text-align: center;
    color: #191a1b;
    border-bottom: 1px solid #ededed;
    cursor: pointer;
  }
  .tab-bar{
    position: absolute;
    width: 50%;
    margin: auto;
    top: 49px;
    left: 0;
    transition: transform .2s cubic-bezier(.35,0,.25,1),-webkit-transform .2s cubic-bezier(.35,0,.25,1);
    span{
      border-bottom: 2px solid #ff5f16;
      border-radius: 20px;
      display: block;
      width: 56px;
      margin: auto;
    }
  }
  // .active{
  //     transform: translate3d(100%, 0px, 0px);
  //   }
  .hhh{
    // border-bottom: #ff5f16 2px solid;
    color: #ff5f16;
  }
</style>
