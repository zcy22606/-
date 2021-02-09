<template> <!-- vue实例外创建 -->
    <div>
        <navbar></navbar>
       <!-- <transition name="fade" appear > -->
            <div class="main" v-if="this.cinemaList">
              <headerbar :left="this.cityName" center="影院" right="iconfont icon-sousuo" @click-left="handleLeft()"></headerbar>
              <headerbottom left="全城" center="APP订票" right="最近去过"></headerbottom>
              <div class="cinema-layer"></div>
              <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功"> -->
                <div class="cinema" :style="{height:height}">
                    <ul class="cinema-list">
                      <li v-for="data in this.cinemaList" :key="data.cinemaId" class="cinema-list-item">
                        <a href="" class="cinema-item">
                          <div class="cinema-info-na"><span class="cinema-name">{{data.name}}</span><span class="cinema-address">{{data.address}}</span></div>
                          <div class="cinema-info-pd"><span class="cinema-price"><i>￥</i>{{data.lowPrice | priceFilter}}<span>起</span></span><span class="cinema-distance">距离未知</span></div>
                        </a>
                      </li>
                    </ul>
                </div>
              <!-- </van-pull-refresh> -->
            </div>
       <!-- </transition> -->
    </div>
</template>

<script>
import navbar from '../components/navbar'
// import http from '../util/util.js'
import BetterScroll from 'better-scroll'
import headerbar from '../components/headerbar'
import headerbottom from '../components/headerbottom'
// import { PullRefresh } from 'vant'
import { mapActions, mapMutations, mapState } from 'vuex'
import Vue from 'vue'
// Vue.use(PullRefresh)
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
      height: 0
      // isLoading: false
      // dataList: []
    }
  },
  components: {
    navbar,
    headerbar,
    headerbottom
  },
  computed: {
    ...mapState('CityModule', ['cityName', 'cityId']),
    ...mapState('CinemaModule', ['cinemaList'])
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaList']),
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    // onRefresh () {
    //   this.isLoading = false
    // },
    handleLeft () {
      // console.log('我执行了')
      this.$router.push('/Cinema/City')
      this.clearCinemaList()
    }
  },
  mounted () {
    this.height = (document.documentElement.clientHeight || document.body.clientHeight) - 144 + 'px'
    if (this.cinemaList.length === 0) {
      // console.log(this.cityName)
      this.getCinemaList(this.cityId).then(res => {
        this.$nextTick(() => {
          this.scroll = new BetterScroll('.cinema', {
            scrollbar: {
              fade: true
            }
          })
          // console.log(this.scroll)
        })
      })
    } else {
      // console.log('缓存')
      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
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
      // padding-top: 94px;
      overflow: hidden;background-color: #fff;left: 0;top: 0; position: relative;
      .cinema-list{
        // list-style: none;
        // margin-bottom: 100px;
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
