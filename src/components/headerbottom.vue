<template>
  <div>
    <header class="header-bottom">
      <ul class="header-bottom-list">
        <li class="bottom-left" @click="selectDistrict"><span>{{left}}</span><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAA/33wPAAAAAXNSR0IArs4c6QAAAUdJREFUKBWNUcFKw0AQnUkQm2q2t0SzDXjIB3jx6NEfUI9ePEov6m946ElEEAQPnoqfIIjH+hOhTQTBFAzYg23GmbQbYkBxYJmd9+ZNZl9srcNzV6mB66ot3/cesyybwz8iiqLVVqvdZ+2NUi5hoLsJEQWlFnFoAe0nSTL+a5bWulsAPgDRjvQhYso6uK5ETBQEL5thuFthjYtw0mOGlDTPsPP840l1Ou8IuMegzWcdAY5ct5MxN6zPCYKwh0D3jCnBeZMvtPA0TcYXrFlEucW8GHDlGQwRbtuOcyL153R6RQTHhuP8BrZ1+DoaPQtWDZKi+XbB+LOLrZZ+GKzppTylipzfsuF7d7PZrMvg9pLQnOWUIVuuOc5BHMcTg0n+sVGdED8Aqc9/dKVsZD+A8CxNR5f1PnP/dZA0iG9YUCkkC3vGDyOu52+oeXRJEaIhBQAAAABJRU5ErkJggg==" alt=""></span></li>
        <li class="bottom-center" @click="selectReserve"><span>{{center}}</span><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAA/33wPAAAAAXNSR0IArs4c6QAAAUdJREFUKBWNUcFKw0AQnUkQm2q2t0SzDXjIB3jx6NEfUI9ePEov6m946ElEEAQPnoqfIIjH+hOhTQTBFAzYg23GmbQbYkBxYJmd9+ZNZl9srcNzV6mB66ot3/cesyybwz8iiqLVVqvdZ+2NUi5hoLsJEQWlFnFoAe0nSTL+a5bWulsAPgDRjvQhYso6uK5ETBQEL5thuFthjYtw0mOGlDTPsPP840l1Ou8IuMegzWcdAY5ct5MxN6zPCYKwh0D3jCnBeZMvtPA0TcYXrFlEucW8GHDlGQwRbtuOcyL153R6RQTHhuP8BrZ1+DoaPQtWDZKi+XbB+LOLrZZ+GKzppTylipzfsuF7d7PZrMvg9pLQnOWUIVuuOc5BHMcTg0n+sVGdED8Aqc9/dKVsZD+A8CxNR5f1PnP/dZA0iG9YUCkkC3vGDyOu52+oeXRJEaIhBQAAAABJRU5ErkJggg==" alt=""></span></li>
        <li class="bottom-right" @click="selectDistance"><span>{{right}}</span><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAA/33wPAAAAAXNSR0IArs4c6QAAAUdJREFUKBWNUcFKw0AQnUkQm2q2t0SzDXjIB3jx6NEfUI9ePEov6m946ElEEAQPnoqfIIjH+hOhTQTBFAzYg23GmbQbYkBxYJmd9+ZNZl9srcNzV6mB66ot3/cesyybwz8iiqLVVqvdZ+2NUi5hoLsJEQWlFnFoAe0nSTL+a5bWulsAPgDRjvQhYso6uK5ETBQEL5thuFthjYtw0mOGlDTPsPP840l1Ou8IuMegzWcdAY5ct5MxN6zPCYKwh0D3jCnBeZMvtPA0TcYXrFlEucW8GHDlGQwRbtuOcyL153R6RQTHhuP8BrZ1+DoaPQtWDZKi+XbB+LOLrZZ+GKzppTylipzfsuF7d7PZrMvg9pLQnOWUIVuuOc5BHMcTg0n+sVGdED8Aqc9/dKVsZD+A8CxNR5f1PnP/dZA0iG9YUCkkC3vGDyOu52+oeXRJEaIhBQAAAABJRU5ErkJggg==" alt=""></span></li>
        </ul>
    </header
    >
  </div>
</template>

<style lang="scss" scoped>
  .header-bottom{
    position: fixed;top: 44px;width: 100%;background-color: white;z-index: 1;
    .header-bottom-list{
        height: 50px;display: flex;line-height: 50px;padding: 0 15px;list-style: none;
        li{
          flex: 1;
          text-align: center;
          color: #191a1b;
          font-size: 14px;
          span{
            padding-right: 5px;
          }
          img{
          width: 6px;
          vertical-align: middle;
          height: 3px;
        }
        }
    }
  }
  .header-bottom::after{
      content: ' ';position: absolute;transform:scaleY(0.5);left: 0;bottom: 0;height: 1px;border-bottom: 1px solid #ededed;width: 100%;
  }
</style>

<script>
export default {
  props: {
    left: {
      type: String,
      default: '请传left值'
    },
    center: {
      type: String,
      default: '请传center值'
    },
    right: {
      type: String,
      default: '请传right值'
    }
  },
  methods: {
    selectDistrict () {
      this.$emit('click-bottom-left')
    },
    selectReserve () {
      this.$emit('click-bottom-center')
    },
    selectDistance () {
      this.$emit('click-bottom-right')
    }
  }
}
</script>
