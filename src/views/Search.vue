<template>
  <div>
    <van-nav-bar
      title="搜索影院"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      placeholder
    />
    <van-list>
      <van-cell>业务组件正在开发中...</van-cell>
      <van-cell>业务逻辑与城市页相似，请参考城市页</van-cell>
    </van-list>
  </div>
</template>

<script>
import { List, Cell, NavBar } from 'vant'
import Vue from 'vue'
Vue.use(List).use(Cell).use(NavBar)
export default {
  methods: {
    onClickLeft () {
      this.$router.push('/Cinema')
    }
  }
}
</script>

<style lang="scss" scope>
  .van-nav-bar__text,.van-nav-bar .van-icon{
    color: #191a1b!important;
  }
</style>
