<template>
  <div>
    <header>
      <ul class="title">
        <li class="title-left" @click="showCities">{{left}} <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAA/33wPAAAAAXNSR0IArs4c6QAAAUdJREFUKBWNUcFKw0AQnUkQm2q2t0SzDXjIB3jx6NEfUI9ePEov6m946ElEEAQPnoqfIIjH+hOhTQTBFAzYg23GmbQbYkBxYJmd9+ZNZl9srcNzV6mB66ot3/cesyybwz8iiqLVVqvdZ+2NUi5hoLsJEQWlFnFoAe0nSTL+a5bWulsAPgDRjvQhYso6uK5ETBQEL5thuFthjYtw0mOGlDTPsPP840l1Ou8IuMegzWcdAY5ct5MxN6zPCYKwh0D3jCnBeZMvtPA0TcYXrFlEucW8GHDlGQwRbtuOcyL153R6RQTHhuP8BrZ1+DoaPQtWDZKi+XbB+LOLrZZ+GKzppTylipzfsuF7d7PZrMvg9pLQnOWUIVuuOc5BHMcTg0n+sVGdED8Aqc9/dKVsZD+A8CxNR5f1PnP/dZA0iG9YUCkkC3vGDyOu52+oeXRJEaIhBQAAAABJRU5ErkJggg==" alt=""></span></li>
        <li class="title-center">{{center}}</li>
        <li class="title-right"><i :class="right"></i></li>
      </ul>
    </header>
  </div>
</template>

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
    showCities () {
      this.$emit('click-left')
    }
  }
}
</script>

<style lang="scss" scoped>
  header{
    width: 100%;
    background-color: white;
    position: fixed;
    top: 0;
    z-index: 1;
    .title{
      display: flex;
      line-height: 44px;
      padding: 0 15px 0 15px;
      height: 44px;
      list-style: none;
      li{
        flex: 1;
      }
      .title-left{
      text-align: left;
      font-size: 13px;
      color: #191a1b;
      img{
        width: 6px;
        vertical-align: middle;
        height: 3px;
      }
      }
      .title-center{
        text-align: center;
        size: 17px;
        color: #191a1b;
      }
      .title-right{
        text-align: right;
        color: black;
        i{
          font-size: 18px;
        }
      }
    }
  }
  header::after{
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    width: 100%;
    transform:scaleY(0.5);
  }
</style>
