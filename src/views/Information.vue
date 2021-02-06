<template> <!-- vue实例外创建 -->
    <div>
        <navbar></navbar>
        <headerbar :left="this.$store.state.cityName" center="资讯" @click-left="handleLeft()"></headerbar>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check = "false"
          offset=0
          >
            <van-cell v-for="data in dataList" :key="data.id" class="news-info">
              <a :href="data.news_href">
                <div class="info-img"><img :src="data.news_img" alt=""></div>
                <h4 class="info-title">{{data.news_title}}</h4>
                <div class="info-text">{{data.news_body}}</div>
                <div class="info-time"><span>{{data.news_time}}</span></div>
              </a>
            </van-cell>
          </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import navbar from '../components/navbar'
import http from '../util/http.js'
import BetterScroll from 'better-scroll'
import { List, Cell, PullRefresh } from 'vant'
import Vue from 'vue'
import headerbar from '../components/headerbar'

Vue.use(List).use(Cell).use(PullRefresh)
export default {
  data () {
    return {
      dataList: [],
      refreshing: false,
      loading: false,
      finished: false,
      current: 1, // 记录第几页
      total: 0
    }
  },
  components: {
    navbar,
    headerbar
  },
  methods: {
    onLoad () {
      this.current++
      http({
        url: `/server/movienews.php?pageNum=${this.current}`
      }).then(res => {
        if (this.refreshing) {
          this.refreshing = false
        }
        // console.log(res.data.data.films)
        this.dataList = [...this.dataList, ...res.data.data]
        this.loading = false
        if (this.dataList.length === this.total) {
          this.finished = true
        }
      })
    },
    handleLeft () {
      // console.log('我执行了')
      this.$router.push('/Cinema/City')
    },
    onRefresh () {
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  mounted () {
    http({
      url: '/server/movienews.php?pageNum=1'
    }).then(res => {
      // console.log(res.data)
      this.dataList = res.data.data
      this.$nextTick(() => {
        new BetterScroll('.news-info', {
          scrollbar: {
            fade: true
          }
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  $master_color:#ff5f16;
  $line: 1px solid #ededed;
  .van-list{
    width: 100%;
    background-color:#f4f4f4;
    margin-top: 45px;
    .van-cell{
      background-color:white;
      margin-bottom: 10px;
      font-size: 15px;
    }
  }
</style>

 <style lang="scss">
  a{
    text-decoration: none!important; color:#333333!important;
  }
  .info-img{
    margin: 5px 0;
    width: 100%;
    height: 138px;
    overflow: hidden;
    position: relative;
    img{
      position: absolute;
      width: 100%;
      // height: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .info-text{
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-size: 14px;
    color: #888;
    margin-bottom: 4px;
  }
  .info-time{
    font-size: 10px;
  }
</style>
