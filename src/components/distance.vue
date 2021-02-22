<template>
  <ul class="filter-list">
    <li :class="isSelected ? 'selected' : 'unselected'" @click="setShow"><i :class=" isSelected ? 'iconfont icon-gou' : 'iconfont'"></i><span class="filter-text" >最近去过</span></li>
    <li :class="!isSelected ? 'selected' : 'unselected'" @click="setShow"><i :class=" !isSelected ? 'iconfont icon-gou' : 'iconfont'"></i><span class="filter-text">离我最近</span></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      isSelected: true
    }
  },
  methods: {
    ...mapMutations('DistrictModule', ['setIsWhich']),
    setShow () {
      this.isSelected = !this.isSelected
      this.setIsWhich('')
    }
  }
}
</script>

<style lang="scss" scoped>
  .selected{
    color: #ff5f16;
  }
  .filter-list{
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #fff;
  }
  .filter-list li{
    height: 44px;
    width: 100vw;
    padding: 0 15px;
    font-size: 13px;
    letter-spacing:-.2px;
    line-height: 44px;
    // border: 1px solid #ededed;
    position: relative;
  }
  .filter-list li::after{
      content: ' ';position: absolute;transform:scaleY(0.5);left: 0;bottom: 0;height: 1px;border-bottom: 1px solid #ededeb;width: 100%;
    }
  .iconfont{
    display: inline-block;
    width: 20px;
  }
  .filter-text{
    margin-left: 10px;
  }
</style>
