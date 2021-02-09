<template>
  <transition name="fade" appear>
    <div>
      <div v-if="dataList" :class="showPhoto ? '' : 'show'">
        <div class="main">
          <div class="film">
            <div class="film-header" v-top v-show="!showPhoto">
              <div class="goBack" @click="back">
                <img src="data:image/png;base64,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" alt="">
              </div>
              <div class="title" v-show="!showPhoto">{{dataList.name}}</div>
            </div>
            <div class="film-img">
              <div class="data-img">
                <img :src="dataList.poster" @click="handleTitleImg">
              </div>
            </div>
            <div class="film-info">
              <div class="info-title">
                <div class="info-name">
                  <span class="name">{{dataList.name}}</span>
                  <span class="item">{{dataList.filmType.name}}</span>
                </div>
                <div class="info-point">
                  <span class="grade">{{dataList.grade}}</span>
                  <span class="grade-text" v-show="dataList.grade ? true : false">分</span>
                </div>
              </div>
              <div class="film-category film-text">{{dataList.category | categoryFilter}}</div>
              <div class="film-premiere-time film-text">{{dataList.premiereAt | premiereAtFiler}}</div>
              <div class="film-nation-runtime film-text">{{dataList.nation}} | {{dataList.runtime}}<span class="runtime-text">分钟</span></div>
              <div :class="hiden ? 'film-synopsis film-text hiden' : 'film-synopsis film-text'">{{dataList.synopsis}}</div>
              <div class="toggle" @click="hiden = !hiden"><img :class="hiden ? '' : 'upper'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAAAAXNSR0IArs4c6QAAAQlJREFUKBWNkT1Lw1AUht8TIlJExKlj/4WQFNIacWyHCoLQ1cXdj59g7e7i6CA4OAhOpbdNIKn2X3Ts1NGhocdzbgmk1NJmuCHnvM+Tc+8lEyVfDBzDxdVZtTrBDk8/SSrI8EbAzBH4EAwPc/qJ4/RkG28zklVGWefoYL8BQg/gcsYYmmjU2iQx8feFZjSrjLIyBTBgdjlKn8V4TUQszfsw8LtFkYnTW/lrh5lJoBeq+TenRJkV5EEzHN2B+LEY0t6KnOkhrHtPObMi0KKOCV68iqS03JoacC6T/QLUDmveRw7re02gRT2o+QKfdq9aAE33HDSDwB/bz8Lyr0D7y6uid5t1+XLTFf8Bk+NpPwQfd0oAAAAASUVORK5CYII=" alt=""></div>
            </div>
            <div class="film-actors">
              <div class="actors-title"><span class="actors-title-text">演职人员</span></div>
              <div class="actors-list">
                <ul>
                  <li v-for="(item,index) in dataList.actors" :key="index">
                    <div class="actors-item">
                      <div class="lazy-img-wrap"><img :src="item.avatarAddress"></div>
                      <div class="actors-name">{{item.name}}</div>
                      <div class="actors-role">{{item.role}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="film-photos">
              <div class="film-photos-title"><span class="title-name">剧照</span><span class="title-photos-all" @click="showPhoto=!showPhoto">全部({{dataList.photos.length}})<i class="iconfont icon-guanbi"></i></span></div>
              <div class="film-photos-img">
                <div class="film-photos-box">
                  <ul class="film-photos-ul">
                    <li v-for="(item,index) in dataList.photos" :key="index">
                      <div class="photos-img">
                        <img :src="item" @click="handleImg(index)">
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="gobuy"><div class="gobuy-box"><div class="gobuy-text">选座购票</div></div></div>
            <div class="photo-title" v-show="showPhoto">
              <div class="goBack" @click="showPhoto=!showPhoto">
                <img src="data:image/png;base64,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" alt="">
              </div>
              <div class="title" v-show="showPhoto">剧照({{dataList.photos.length}})</div>
            </div>
            <div v-show="showPhoto" class="album-zone">
              <ul class="all-photos">
                <li v-for="(data,index) in dataList.photos" :key="index"><img :src="data" alt="" class="all-photos-item" @click="handleImg(index)"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  $master_color:#ff5f16;
  $line: 1px solid #ededed;
  *{margin: 0;padding: 0;}
  img{display: block;}
  ul{list-style: none;}
  .main{height: 100%;}
  .film-header{position: fixed;background-color: hsla(0, 0%, 100%, 0);color: transparent;width: 100vw;height: 44px;z-index: 1;
      .goBack{
        height: 30px;position: absolute;top: 5px;left: 5px;
        img{width: 30px;}
      }
      .title{
        font-size: 17px;line-height: 44px;width: 100vw;text-align: center;
        }
    }
    .show-film-header{transition: all .3s ease;background-color: #fff;color: #191a1b;}
    .film-img{width: 100%;background-color: white;
      .data-img{width: 100%;position: relative;overflow: hidden;top: 0;height: 56vw;
        img{width: 100%;position: absolute;top: 50%;left: 0;transform: translateY(-50%);}
      }
    }
    .photo-title{position: fixed;width: 100vw;height: 44px;top:0;background-color: #fff;
      .goBack{
        height: 30px;position: absolute;top: 5px;left: 5px;
        img{width: 30px;}
      }
      .title{
        font-size: 17px;line-height: 44px;width: 100vw;text-align: center;
        }
    }
    .show-film-header{transition: all .3s ease;background-color: #fff;color: #191a1b;}
    .film-img{width: 100%;background-color: white;
      .data-img{width: 100%;position: relative;overflow: hidden;top: 0;height: 56vw;
        img{width: 100%;position: absolute;top: 50%;left: 0;transform: translateY(-50%);}
      }
    }
  .film{
    // transform: none !important;
    background-color: black;
    display: inline;
    .film-info{
      .film-text{
        font-size: 13px;color: #797d82;margin-top: 4px;
      }
      padding: 15px;padding-top: 12px;background-color: #fff;
      .info-title{
        display: flex;justify-content: flex-start;-webkit-box-pack: start;-webkit-box-align: center;align-items: center;
        .info-name{
          width: 256px;
          span{
            vertical-align: middle;
          }
          .name{
            color: #191a1b;font-size: 18px;height: 24px;line-height: 24px;margin-right: 7px;font-weight: bold;
          }
          .item{
            font-size: 9px;color: white;background-color: #d2d6dc;height: 14px;line-height: 14px;padding: 0 2px;border-radius: 2px;display: inline-block;
          }
        }
        .info-point{
          width: calc(100% - 250px);text-align: right;color: #ffb232;
          .grade{
            font-size: 18px;font-style: italic;
          }
          .grade-text{
            font-size: 10px;margin-left: 4px;
          }
        }
      }
      .film-synopsis{
          margin-top: 12px;
          transition: height 3s ease;
      }
      .hiden{
          // height: 37px!important;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          // transition: height 3s ease;
      }
      .toggle{
          padding: 10px 0;
          display: block;
          text-align: center;
          height: auto;
          width: 20px;
          margin: auto;
          box-sizing: border-box;
          line-height: normal;
          img{
            width: 8px;
            margin: auto;
          }
      }
      .upper{
        transform: rotate(180deg);
      }
    }
    .film-actors{
      margin-top: 10px;
      background-color: white;
      .actors-title{
        padding: 15px;
        .actors-title-text{
          font-size: 16px;
          text-align: left;
          color: #191a1b;
          height: 22px;
          line-height: 22px;
        }
      }
      .actors-list{
        height: 140px;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        ul{
          display: flex;
          justify-content: flex-start;
          // -webkit-box-pack: start;
          position: relative;
          width: 100%;
          margin: 0;
          padding-left: 15px;
          li{
            float: left;
            width: 85px;
            min-width: 85px;
            position: relative;
            margin-right: 10px;
            cursor: pointer;
            .actors-item{
              text-align: center;
              .lazy-img-wrap{
                width: 85px;
                height: 85px;
                position: relative;
                overflow: hidden;
                img{
                  width: 100%;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
              .actors-name{
                padding-top: 10px;
                font-size: 12px;
                color: #191a1b;
                width: 85px;
                height: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .actors-role{
                font-size: 10px;
                color: #797d82;
              }
            }
          }
        }
      }
    }
    .film-photos{
      width: 100%;
      margin-top: 10px;
      background-color: #fff;
      margin-bottom: 70px;
      .film-photos-title{
        display: flex;
        justify-content: space-between;
        padding: 15px;
        height: 22px;
        line-height: 22px;
        .title-name{
          font-size: 16px;
          text-align: left;
          color: #191a1b;
        }
        span{
          text-align: right;
          font-size: 13px;
          justify-self:flex-end;
          color: #797d82;
          i{
            font-size: 10px;
            padding-left: 4px;
          }
        }
      }
      .film-photos-box{
        height: 115px;
        background-color: white;
        overflow-x: auto;
        overflow-y: hidden;
        .film-photos-ul{
          display: flex;
          justify-content: flex-start;
          position: relative;
          width: 100%;
          padding-left: 15px;
          -webkit-box-pack: start;
          margin: 0;
          li{
            position: relative;
            margin-right: 10px;
            width: 150px;
            height: 100px;
            min-width: 150px;
            cursor: pointer;
            float: left;
            .photos-img{
              width: 100%;
              height: 100px;
              position: absolute;
              overflow: hidden;
              top: 0;
              img{
              position: absolute;
              top: 50%;
              width: 100%;
              transform: translateY(-50%);
              }
            }
          }
        }
      }
    }
    .gobuy{
      overflow-x:auto;
      overflow-y: scroll;
      height: 50px;
      position: fixed;
      width: 100%;
      cursor: pointer;
      left: 0;
      .gobuy-box{
        position: fixed;
        height: 50px;
        width: 100%;
        bottom: 0;
        .gobuy-text{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          background-color: #ff5f16;
          color: white;
          text-align: center;
          line-height: 50px;
        }
      }
    }
  }
  .album-zone{
        position: fixed;
        top: 44px;
        left: 0;
        overflow-y: auto;
        background-color: #fff;
        right: 0;
        bottom: 0;
        width: 100%;
        // height: 100%;
        .all-photos{
          display: flex;
          align-content: center;
          flex-wrap: wrap;
          width: 100%;
          .all-photos-item{
            width: calc(33.33333vw - 1px);
            height: calc(33.33333vw - 1px);
            margin-bottom: 1px;
            padding-right: 1px;
            img{
              width: 100%;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }
  .actors-list::-webkit-scrollbar{
    display: none;
  }
  .film-photos-box::-webkit-scrollbar{
    display: none;
  }
  .fade-enter-active, .fade-leave-avtive {
    transition: opacity 1s;
    transition: transform 1s;
  }
  .fade-enter, .fade-leave-to {
      opacity: 0;
      transform: translateY(20px);
  }
</style>

<script>
import http from '../util/util.js'
import Vue from 'vue'
import moment from 'moment'
import { ImagePreview } from 'vant'
// import 自定义模块名称 from '模块标识符'
Vue.filter('categoryFilter', data => {
  return data.split('|').join(' | ')
})

Vue.filter('premiereAtFiler', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})

Vue.directive('top', {
  inserted (el) {
    window.onscroll = () => {
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 10) {
        el.classList.add('show-film-header')
      } else {
        el.classList.remove('show-film-header')
      }
    }
    if (document.querySelector('.album-zone').style.display !== 'none') {
      el.classList.add('show-film-header')
    } else {
      el.classList.remove('show-film-header')
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  data () {
    return {
      id: '',
      dataList: null,
      hiden: true,
      isShow: true,
      showPhoto: false
    }
  },
  mounted () {
    this.id = this.$route.params.myid
    http({
      url: `gateway?filmId=${this.id}&k=5391545`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data.data)
      this.dataList = res.data.data.film
    })
  },
  methods: {
    back () {
      this.$router.go(-1) // 返回上一层
    },
    handleImg (index) {
      ImagePreview({
        images: this.dataList.photos,
        startPosition: index,
        closeable: true
      })
    },
    handleTitleImg () {
      const imgs = []
      imgs.push(this.dataList.poster)
      ImagePreview({
        images: imgs,
        closeable: true
      })
    }
    // handleClick (el) {
    //   this.hiden = !this.hiden
    //   el.target.style.transform = 'rotate(180deg)'
    // }
    // unfold () {
    //   const oHiden = document.querySelector('.hiden')
    //   const oDiv = document.querySelector('.film-synopsis')
    //   if (oHiden) {
    //     oDiv.classList.remove('hiden')
    //     oDiv.style.height = oDiv.offsetHeight
    //   } else {
    //     oDiv.classList.add('hiden')
    //   }
    // }
  }
}
</script>
