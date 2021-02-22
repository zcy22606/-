<template>
  <div class="container">
    <ul class="district-list">
      <li class="district-item" v-for="(data,index) in district" :key = index @click="handleSelect(data)">
        <div :class="selected === data ? 'select' : ''">
          {{data}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import BetterScroll from 'better-scroll'
// import http from '../util/util'
// import Vue from 'vue'
// Vue.filter('')
export default {
  data () {
    return {
      district: []
      // select: this.selected
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList', 'cityCinema']),
    ...mapState('DistrictModule', ['selected']),
    ...mapState('CityModule', ['cityId'])
    // ...mapState('DistrictModule', ['isWhich'])
  },
  methods: {
    ...mapMutations('DistrictModule', ['setSelectDistrict']),
    ...mapMutations('DistrictModule', ['clearIsWhich']),
    ...mapMutations('CinemaModule', ['setCinemaList']),
    ...mapActions('CinemaModule', ['getCinemaList']),
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    handleSelect (data) {
      this.clearCinemaList()
      this.setSelectDistrict(data)
      this.clearIsWhich()
      const obj = {
        cityId: this.cityId,
        selected: this.selected
      }
      this.height = (document.documentElement.clientHeight || document.body.clientHeight) - 144 + 'px'
      this.getCinemaList(obj).then(res => {
        this.$nextTick(() => {
          this.scroll = new BetterScroll('.cinema')
          console.log(this.scroll)
        })
      })
    //   // console.log(this.cinemaList)
    //   // this.getCinemaList(this.cityId)
    //   // const list = this.cinemaList.filter(item => {
    //   //   return item.districtName === data
    //   // })
    //   // if (this.selected === '全城') {
    //   //   this.getCinemaList(this.cityId)
    //   //   console.log(this.cinemaList)
    //   // } else {
    //   //   console.log(list)
    //   //   this.setCinemaList(list)
    //   //   console.log(this.cinemaList)
    //   // }
    //   // this.height = (document.documentElement.clientHeight || document.body.clientHeight) - 144 + 'px'
    //   // console.log(this.cityName)
    }
  },
  mounted () {
    // const cinema = http
    // setTimeout(() => {
    // http({
    //   url: `gateway?cityId=${this.cityId}&ticketFlag=1&k=6051222`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    const list = this.cityCinema.map(item => {
      return item.districtName
    })
    this.district = [...new Set(list)]
    this.district.unshift('全城')
    // })
    console.log(this.district)
  }
  // }, 0)
}
</script>

<style lang="scss" scoped>
  $className: select;
  .district-list{
    padding: 10px 0 0 10px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: center;
    -webkit-box-pack: start;
    .district-item{
      font-size: 12px;
      width: calc(25vw - 12.5px);
      padding-right: 10px;
      padding-bottom: 15px;
      height: 30px;
      line-height: 30px;
      flex-shrink: 1;
      display: inline-block;
      text-align: center;
      div{
        position: relative;
        color: #797d82;
        border-radius: 3px;
        &::after{
          content: " ";
          transform: scale(.5);
          position: absolute;
          border: 1px solid rgba(210,214,220,.5);
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          border-radius: 4px;
        }
      }
      div.select{
        color: #ff5f16;
        &::after{
          content: " ";
          transform: scale(.5);
          position: absolute;
          border: 1px solid #ff5f16;
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          border-radius: 4px;
        }
      }
    }
  }
</style>
