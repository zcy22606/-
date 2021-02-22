<template>
  <div class="card">
    <div class="left"><i :class="leftIcon" :style="'color:' + color"></i><span>{{left}}</span></div>
    <div class="right"><span>{{right}}</span><i :class="rightIcon"></i></div>
  </div>

</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    left: {
      type: String,
      default: '请传left值'
    },
    right: {
      type: String,
      default: ''
    },
    leftIcon: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .card::after{
    content: ' ';position: absolute;left: 10px;bottom: 0;height: 1px;border-bottom: 1px solid #ededed;transform:scaleY(0.5); right: 10px;
  }
  // .left{
  //   float: left;
  // }
  // .right{
  //   float: right;
  // }
  .card{
    position: relative;
    // width: 100%;
    padding: 0 15px;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    -webkit-box-align:center;
  }
  .left{
    flex: 1;
    -webkit-box-flex:1;
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
      // line-height: 50px;
      font-size: 15px;
      color: #191a1b;
    }
    .iconfont{
      // height: 50px;
      // line-height: 50px;
      font-size: 25px;
      // transform: scale(.5);
    }
  }
  .right{
    height: 50px;
    line-height: 50px;
    span{
      color: #191a1b;
      font-size: 14px;
      margin-right: 15px;
    }
    i{
      font-size: 12px;
      color: #d3d5d8;
    }
  }
</style>
