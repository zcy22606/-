<template> <!-- vue实例外创建 -->
    <div >
        <navbar></navbar>
       <!-- <transition name="fade" appear > -->
            <div class="main" v-if="this.cinemaList" @click="handleWhich">
              <headerbar :left="this.cityName" center="影院" right="iconfont icon-sousuo" @click-left="handleLeft()" @click-right="handleRight()"></headerbar>
              <headerbottom :left="this.selected" center="APP订票" right="最近去过"  @click-bottom-left="handleBottomLeft" @click-bottom-center="handleBottomCenter()" @click-bottom-right="handleBottomRight()"></headerbottom>
              <div class="cinema-layer"></div>
              <div class="mint-popup">
                <keep-alive>
                  <component :is="isWhich"></component>
                </keep-alive>
              </div>
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
              <div class="aaa" v-show="this.isWhich"></div>
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
import district from '../components/District'
import reserve from '../components/reserve'
import distance from '../components/distance'
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
    headerbottom,
    district,
    reserve,
    distance
  },
  computed: {
    ...mapState('CityModule', ['cityName', 'cityId']),
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('DistrictModule', ['selected']),
    ...mapState('DistrictModule', ['isWhich'])
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaList']),
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    ...mapMutations('DistrictModule', ['setIsWhich']),
    ...mapMutations('DistrictModule', ['clearSelectDistrict']),
    ...mapMutations('DistrictModule', ['clearIsWhich']),
    // onRefresh () {
    //   this.isLoading = false
    // },
    handleLeft () {
      // console.log('我执行了')
      this.$router.push('/Cinema/City')
      this.clearCinemaList()
      this.clearSelectDistrict()
      this.clearIsWhich()
    },
    handleRight () {
      this.$router.push('/Cinema/Search')
      this.clearIsWhich()
    },
    handleBottomLeft () {
      if (!this.isWhich || this.isWhich !== 'district') {
        this.setIsWhich('district')
      } else {
        this.clearIsWhich()
      }
    },
    handleWhich (e) {
      if (e.target.className === 'aaa') {
        this.setIsWhich('')
      }
    },
    handleBottomCenter () {
      if (!this.isWhich || this.isWhich !== 'reserve') {
        this.setIsWhich('reserve')
      } else {
        this.clearIsWhich()
      }
    },
    handleBottomRight () {
      console.log('我执行了')
      if (!this.isWhich || this.isWhich !== 'distance') {
        this.setIsWhich('distance')
      } else {
        this.clearIsWhich()
      }
    }
  },
  mounted () {
    this.height = (document.documentElement.clientHeight || document.body.clientHeight) - 144 + 'px'
    if (this.cinemaList.length === 0) {
      // console.log(this.cityName)
      const obj = {
        cityId: this.cityId,
        selected: this.selected
      }
      this.getCinemaList(obj).then(res => {
        this.$nextTick(() => {
          this.scroll = new BetterScroll('.cinema')
          console.log(this.scroll)
        })
      })
    } else {
      // this.scroll = null
      // console.log('缓存')
      this.$nextTick(() => {
        new BetterScroll('.cinema')
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
    .mint-popup{
      position: fixed;
      top: 94px;
      left: 0;
      z-index: 1999;
    }
    .aaa{
      background: rgba(0,0,0,.6);
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: .5;
    }
  }
</style>
