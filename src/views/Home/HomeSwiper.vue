<template>
  <div>
    <div class="swiper-container" id="swiper1">
      <div class="swiper-wrapper banner">
        <div class="swiper-slide" v-for="(data,index) in swiperBanner" :key="index"><img :src="data" alt=""></div>
      </div>
  <!-- If we need pagination -->
      <!-- <div class="swiper-pagination"></div> -->
      <!-- If we need navigation buttons -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
      <!-- If we need scrollbar -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
export default {
  data () {
    return {
      swiperBanner: [
        'https://img.zcool.cn/community/01e8fb5bd95f7ea80121ab5da33d46.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/0110835bd95f84a80121ab5d6021af.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/012b3c5bd95f8ba8012092529be2c4.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/013a8d5bd95f90a80121ab5d6cbf62.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/0124f95bd95f94a8012092521da3af.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/0112f55bd95f98a801209252414869.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/0199215bd95f9ea801209252af2ffa.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/01b1825bd95fa7a8012092526af66e.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/013f555bd95faba8012092520d14a9.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/012dad5bd95fbba8012092527ffa16.jpg@1280w_1l_2o_100sh.jpg'
      ]
    }
  },
  mounted () {
    new Swiper('#swiper1', {
      autoplay: true,
      // direction: 'vertical',
      loop: true
      // pagination: {
      //   el: '.swiper-pagination'
      // },
      // Navigation arrows
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      //   disabledClass: 'my-button-disabled'
      // },

      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar'
      // }
    })
  }
}
</script>

<style lang="scss" scoped>
.my-button-disabled{
  opacity:0.2;
}
.swiper-container{
    --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
    --swiper-navigation-color: #ff6600;/* 单独设置按钮颜色 */
    --swiper-navigation-size: 20px;/* 设置按钮大小 */
}
.banner{
  width: 100%;
  height: 150px;
  div{
    width: 100%;
    height: 100%;
    position: relative;
    img{
      display: block;
      width: 100%;
      // height: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
