<template>
  <div>
    <!-- <router-link to="/About">关于我们</router-link> -->
    <!-- 路由包装容器 -->
    <section>
        <div>
          <router-view></router-view>
        </div>
    </section>
  </div>
</template>
<script>
// import navbar from './components/navbar' // 导入导航组件
// import axios from 'axios'
export default {
  data () {
    return {
      myname: 'abc'
    }
  }
  // components: { // 注册导航组件
  //   navbar
  // }
  // mounted () {
  //   // axios.get('http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1611307056110&summary=802e00da1b311fca0d80533eef8dc415&platform_code=H5').then(
  //   //   res => {
  //   //     console.log(res.data)
  //   //   }
  //   // )
  //   axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=7AE78CC0557211EBA826354C0CFBD58AE04644ABEB864C74A5785F38143DDCE1&optimus_risk_level=71&optimus_code=10').then(
  //     res => {
  //       console.log(res.data)
  //     }
  //   )
  // }
}
</script>

<style lang="scss" scoped>
*{
  color: #797d82;
}
section{
  margin-bottom: 50px;
  // background-color: white;
}
 .home-header::after{
    content: '';
    display: block;
    clear: both;
  }
  .fade-enter-active, .fade-leave-avtive {
    transition: opacity 1s;
    transition: transform 1s;
  }
  .fade-enter, .fade-leave-to {
      opacity: 0;
      transform: translateY(-50px);
  }
</style>
