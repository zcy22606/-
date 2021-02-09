<template>
  <div id="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check = "false"
      offset=0
      >
        <van-cell v-for="data in dataList" :key="data.filmId" @click="handleClick(data.filmId)">
          <div class="info-img"><img :src="data.poster" :alt="data.name"></div>
          <div class="info-all">
            <div class="info-name"><span class="name">{{data.name}}</span><span class="item">{{data.item.name}}</span></div>
            <div class="info-point"><span class="label">观众评分</span><span class="point">{{data.grade | pointFilter}}</span></div>
            <p class="info-actors">主演：{{data.actors | actorFilter}}</p>
            <p class="info-time">{{data.nation}} | {{data.runtime}}分钟</p>
          </div>
          <div class="home-buy">购票</div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import http from '../../util/util.js'
import Vue from 'vue'
import { mapState } from 'vuex'
import { List, Cell, PullRefresh } from 'vant'
Vue.use(List).use(Cell).use(PullRefresh)// 全局注册
Vue.filter('actorFilter', (actors) => {
  // console.log(actors)
  if (actors === undefined) return '暂无主演'
  return actors.map(item => item.name).join(' ')
})
Vue.filter('pointFilter', (point) => {
  if (point === undefined) return '暂无评分'
  return point
})
export default {
  data () {
    return {
      dataList: [],
      loading: false, // 是否正在加载中,防止多次触发
      finished: false,
      current: 1, // 记录第几页
      total: 0, // 总数据长度
      refreshing: false
    }
  },
  computed: {
    ...mapState('CityModule', ['cityName', 'cityId'])
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/data/${id}`)
      // this.$router.push({
      //   name: 'Databb',
      //   params: {
      //     myid: id
      //   }
      // })
      // this.$router.push(`/data?myid=${id}`)
    },
    onLoad () {
      this.current++
      http({
        url: `gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=9340213`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        // console.log(res.data.data.films)
        this.dataList = [...this.dataList, ...res.data.data.films]
        this.loading = false
        if (this.dataList.length === this.total) {
          this.finished = true
        }
      })
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  mounted () {
    this.loading = true
    http({
      url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=9340213`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(
      res => {
        this.dataList = res.data.data.films
        this.total = res.data.data.total
        this.loading = false
        // console.log(res)
      }
    )
  }
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  $master_color:#ff5f16;
  $line: 1px solid #ededed;
  #container{
    .van-list{
      list-style: none;
      box-sizing: border-box;
      // box-sizing: content-box;
      margin: 0 15px 0 15PX;
      .van-cell{
        height: 94px;
        padding: 15px 0px 15px 0;
        cursor: pointer;
        // border-bottom: 1px solid #ededed;
        box-sizing: content-box!important;
        display: block!important;
        // overflow: auto!important;
        line-height: 16px!important;
        .info-img{
          width: 66px;
          height: 94px;
          float: left;
          position: relative;
          overflow: hidden;
          top: 0;
          img{
            width: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            border-radius: 2px;
            transform: translateY(-50%);
            // z-index: -9999;
          }
        }
        .info-all{
          width: calc(100% - 130px);
          float: left;
          padding: 0 0px 0 10px;
          font-size: 13px;
          .info-name{
            width: calc(100% - 116px);
            white-space: nowrap;
            margin-top: 10px!important;
            .name{
              font-size: 16px;
              height: 22px;
              margin-right: 5px;
              color: black;
              font-weight: bold;
              width: calc(100% - 25px);
            }
            .item{
              font-size: 9px;
              color: white;
              background-color: #d2d6dc;
              height: 14px;
              padding: 0 2px;
              border-radius: 2px;
            }
          }
          .info-point{
            margin-top: 4px;
            .label{
              font-size: 13px;
              color: #797d82;
            }
            .point{
              font-size: 14px;
              color: #ffb232;
              font-weight: bold;
              margin-left: 4px;
            }
          }
          .info-actors{
            margin-top: 4px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
          }
          .info-time{
            margin-top: 4px;
          }
        }
        .home-buy{
          float: right;
          height: 25px;
          width: 50px;
          color: $master_color;
          line-height: 25px;
          font-size: 13px;
          text-align: center;
          border-radius: 2px;
          border: 1px solid$master_color;
          margin-top: 35px;
        }
      }
    }
    .van-cell::after{
      content: ' ';position: absolute;left: 0;bottom: 0;height: 1px;border-bottom: 1px solid #ededed;width: 100%;transform:scaleY(0.5);
    }
  }
</style>
<style>
  .van-list__loading{
   text-align: center;
   padding: 8px 0 8px 0;
  }
  .van-list__finished-text{
   text-align: center;
   padding: 8px 0 8px 0;
  }
</style>
