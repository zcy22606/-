<template>
  <div>
    <van-nav-bar
      :title="'当前城市-' + this.cityName"
      left-text="返回"
      :placeholder='true'
      :fixed="true"
      @click-left="goCinema"
    />
      <div class="search">
        <van-search v-model="value" placeholder="请输入城市名或拼音" @input="handleSearch"/>
      <div class="search-text" @click="clearSearch">取消</div>
      </div>
    <!-- <van-index-bar :index-list="computedSearchList" @change="handleindex" :sticky="false" v-show="isShow">
      <div v-for="data in searchList" :key="data">
        <van-index-anchor :index="a"/> -->
        <div class="searchCity" v-show="isShow">
          <div v-for="item in searchList" :key="item.cityId">
            <van-cell :title="item.name" @click="changeCity(item)"/>
          </div>
        </div>
      <!-- </div> -->
  <!-- </van-index-bar> -->
    <van-index-bar :index-list="computedCityList" @change="handleindex" :sticky="false" v-show="!isShow">
      <div class="recommend-city">
        <div class="location-city">
          <div id="box" v-show="false"></div>
          <div class="location-city-title">GPS定位您所在的城市</div>
          <ul class="location-city-list">
            <li class="location-city-item" @click="changeCity(cityObj[0])">
              <div class="locationcity-item-text"><span>{{city}}</span></div>
            </li>
          </ul>
        </div>
        <div class="hot-city">
          <div class="hot-city-title">热门城市</div>
          <ul class="hotcity-list">
            <li class="hotcity-item" v-for="data in hotCity" :key="data.cityId" @click="changeCity(data)">
              <div class="hotcity-item-text">
                {{data.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type"/>
        <van-cell v-for="item in data.list" :title="item.name" :key="item.cityId" @click="changeCity(item)"/>
      </div>
  </van-index-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, Toast, NavBar, Search } from 'vant'
import http from '../util/util.js'
import { mapMutations, mapState } from 'vuex'
import { getLocation } from '@/util/location.js'
Vue.use(IndexBar).use(IndexAnchor).use(Cell).use(NavBar).use(Search)
export default {
  data () {
    return {
      cityList: [],
      value: '',
      searchList: [],
      isShow: false,
      cityObj: [],
      city: '',
      hotCity: []
    }
  },
  computed: {
    ...mapState('CityModule', ['cityName']),
    computedCityList () {
      return this.cityList.map(item => item.type)
    },
    computedSearchList () {
      return this.searchList.map(item => item.type)
    }
  },
  mounted () {
    // VueAMap.initAMapApiLoader({
    //   // 高德key
    //   key: 'd6944c3442efb22e86df8d312edaa838', // 自己到官网申请，我随便写的
    //   // 插件集合 （插件按需引入）
    //   plugin: ['AMap.CitySearch'],
    //   v: '1.4.15', // 我也不知道为什么要写这个，不写项目会报错，而且我随便写的，跟我下载的版本对应不了
    //   uiVersion: '1.0.11' // ui版本号，也是需要写
    // })
    this.city = '定位中'
    http({
      url: '/gateway?k=7349490',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data)
      this.cityList = this.handleCities(res.data.data.cities)
      // console.log(typeof this.cityList[1].list[0].isHot)
      this.cityList.forEach(item => {
        const list = item.list.filter(res => { return res.isHot === 1 })
        // console.log(list)
        if (list.length > 0) {
          // console.log('我执行了')
          // console.log(list)
          this.hotCity = [...this.hotCity, ...list]
        }
      })
      this.city = '定位中'
      Toast.loading({
        message: '定位中...',
        forbidClick: true,
        // overlay: true,
        duration: 0
      })
      getLocation('box', (data) => {
        // console.log(data)
        if (data === undefined) {
          console.log('我执行了')
          Toast({
            message: '获取位置信息失败'
          })
          this.city = '定位失败'
          // console.log(this.city)
        } else {
          Toast.clear()
          const myCity = data.replace('市', '')
          this.city = myCity
          this.cityList.forEach(item => {
            const list = item.list.filter(res => { return res.name === myCity })
            if (list.length > 0) {
              this.cityObj = list
              // console.log(this.cityObj)
            }
          })
        }
      })
    })
  },
  methods: {
    ...mapMutations('CityModule', ['changeCityName', 'changeCityId']),
    handleindex (index) {
      Toast({
        message: index,
        duration: 500
      })
    },
    clearSearch () {
      this.searchList = []
      this.isShow = false
      this.value = ''
    },
    changeCity (data) {
      console.log(data)
      if (data) {
        console.log('我发送了')
        this.changeCityName(data.name)
        this.changeCityId(data.cityId)
        this.$router.back()
      } else {
        console.log('失败')
      }
    },
    goCinema () {
      this.$router.replace('/Cinema')
    },
    handleSearch () {
      this.searchList = []
      this.cityList.forEach(item => {
        const list = item.list.filter(data => {
          return data.name.includes(this.value) || data.pinyin.includes(this.value)
        })
        if (list.length > 0) {
          this.searchList = [...this.searchList, ...list]
        }
      })
      if (this.searchList.length > 0) {
        this.isShow = true
      } else {
        this.isShow = !this.isShow
      }
      if (!this.value) {
        this.searchList = []
      }
      // console.log(this.searchList[0].name)
    },
    handleCities (data) {
      const arr = []
      for (let i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i))
      }
      const cities = []
      arr.forEach(i => {
        const list = data.filter(item => {
          return item.pinyin.substring(0, 1).toUpperCase() === i
        })
        if (list.length > 0) {
          cities.push({
            type: i,
            list: list
          })
        }
        // cities.push(list)
      })
      return cities
    }
  }
}
</script>

<style scoped>
    div /deep/.van-toast--html .van-toast--text,div /deep/.van-toast--middle .van-toast--text,div /deep/.van-toast--text .van-toast--text{
      min-width: 10px!important;
      /* max-width: 10px; */
    }
    div /deep/.van-nav-bar__left .van-nav-bar__text,div /deep/.van-nav-bar__left .van-icon{
      color: #191a1b;
    }
    div /deep/ .van-index-bar{
      margin-top: 54px;
    }
    div /deep/.van-index-bar__index{
      font-size: 14px;
      padding: 4px 8px;
    }
    div /deep/.search{
      position: fixed;
      top: 46px;
      left: 0;
      width: 100%;
      z-index: 10;
    }

    div /deep/.van-search{
      float: left;
      width: calc(100% - 43px);
    }
    .search-text{
      width: 43px;
      height: 54px;
      float: right;
      line-height: 54px;
      background-color: white;
      font-size: 14px;
    }
    div /deep/.searchCity{
      margin-top: 54px;
    }
</style>

<style lang="scss">
  .recommend-city{
    width: 100%;
    padding: 15px 15px 15px 15px;
    box-sizing: border-box;
    background-color: white;
    .location-city{
      width: 100%;
      .location-city-title{
        font-size: 13px;
        color: #797d82;
        margin-bottom: 10px;
      }
      .location-city-list{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: wrap;
        .location-city-item{
          width: calc(33.33333vw - 11px);
          text-align: center;
          padding-bottom: 15px;
          .locationcity-item-text{
            height: 30px;
            background-color: #f4f4f4;
            line-height: 30px;
            border-radius: 3px;
            box-sizing: border-box;
            margin: 0 7.5px;
            font-size: 14px;
            color: #191a1b;
          }
        }
      }
    }
  }
  .hot-city{
    width: 100%;
    .hot-city-title{
      font-size: 13px;
      color: #797d82;
      margin-bottom: 10px;
    }
    .hotcity-list{
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-content: center;
      flex-wrap: wrap;
      .hotcity-item{
        width: calc(33.33333vw - 11px);
        text-align: center;
        padding-bottom: 15px;
        .hotcity-item-text{
          height: 30px;
          background-color: #f4f4f4;
          line-height: 30px;
          border-radius: 3px;
          box-sizing: border-box;
          margin: 0 7.5px;
          font-size: 14px;
          color: #191a1b;
        }
      }
    }
  }
</style>
