<template> <!-- vue实例外创建 -->
    <div>
        <navbar></navbar>
       <!-- <transition name="fade" appear > -->
         <div class="main" v-if="dataList">
          <headerbar left="北京" center="影院" right="iconfont icon-sousuo"></headerbar>
          <headerbottom left="全城" center="APP订票" right="最近去过"></headerbottom>
          <div class="cinema-layer"></div>
          <div class="cinema" :style="{height:height}">
              <ul class="cinema-list">
                <li v-for="data in dataList" :key="data.cinemaId" class="cinema-list-item">
                  <a href="" class="cinema-item">
                    <div class="cinema-info-na"><span class="cinema-name">{{data.name}}</span><span class="cinema-address">{{data.address}}</span></div>
                    <div class="cinema-info-pd"><span class="cinema-price"><i>￥</i>{{data.lowPrice | priceFilter}}<span>起</span></span><span class="cinema-distance">距离未知</span></div>
                  </a>
                </li>
              </ul>
          </div>
         </div>
       <!-- </transition> -->
    </div>
</template>

<script>
import navbar from '../components/navbar'
import axios from 'axios'
import BetterScroll from 'better-scroll'
import headerbar from '../components/headerbar'
import headerbottom from '../components/headerbottom'
import Vue from 'vue'
Vue.filter('priceFilter', data => {
  const price = (data / 100).toFixed(1)
  if (price.endsWith('0')) {
    return (data / 100)
  } else {
    return price
  }
})
// Vue.directive('height', {
//   inserted (el) {
//     el.height = (document.documentElement.clientHeight || document.body.clientHeight) + 'px'
//   },
//   unbind (el) {
//     el.height = (document.documentElement.clientHeight || document.body.clientHeight) + 'px'
//   }
// })
export default {
  data () {
    return {
      dataList: null,
      height: 0
    }
  },
  components: {
    navbar,
    headerbar,
    headerbottom
  },
  mounted () {
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=6051222',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"161130720666340064854017","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      this.dataList = res.data.data.cinemas
      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    })
    this.height = (document.documentElement.clientHeight || document.body.clientHeight) - 100 + 'px'
  }
}
</script>

<style lang="scss" scoped>
  // .fade-enter-active, .fade-leave-avtive {
  //   transition: opacity 1s;
  //   transition: transform 1s;
  // }
  // .fade-enter, .fade-leave-to {
  //     opacity: 0;
  //     transform: translateY(20px);
  // }
  $master_color:#ff5f16;
  $line: 1px solid #ededed;
  a{
    color: #797d82;
    text-decoration: none;
  }
  .main{
    .cinema-layer{
      padding-top: 94px;
    }
    .cinema{
      overflow: hidden;background-color: #fff;padding-bottom: 50px;box-sizing: border-box; position: relative;
      .cinema-list{
        // list-style: none;
        .cinema-list-item{
          position: relative;background-color: #fff;padding: 15px;
          .cinema-item{
            width: 100%;display: flex;align-items: center;justify-content: flex-start;
            .cinema-info-na{
              width: calc(100% - 85px);text-align: left;padding-right: 15px;display: flex;flex-direction: column;
              span{
                flex: 1;max-width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
              }
              .cinema-name{
                font-size: 15px;float: left;color: #191a1b;max-width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
              }
              .cinema-address{
                font-size: 12px;color: #797d82;margin-top: 5px;
              }
            }
            .cinema-info-pd{
              width: 70px;text-align: center;display: flex;flex-direction: column;
              .cinema-price{
                font-size: 15px;
                color: $master_color;
                i{
                  font-size: 11px;
                  font-style: normal;
                }
                span{
                  font-size: 10px;
                }
              }
              .cinema-distance{
                font-size: 11px;
                margin-top: 5px;
                color: #797d82;
              }
            }
          }
        }
      }
    }
    .cinema-list-item:after{
      content: ' ';position: absolute;left: 0;bottom: 0;height: 1px;border-bottom: 1px solid #ededed;width: 100%;transform:scaleY(0.5);
    }
  }
</style>
