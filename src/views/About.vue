<template> <!-- vue实例外创建 -->
    <div>
        <navbar></navbar>
        我是个人中心
    </div>
</template>

<script>
import navbar from '../components/navbar'
export default {
  components: {
    navbar
  }
  // mounted () {
  //   if (!localStorage.getItem('abc')) {
  //     this.$router.push('/login')
  //   }
  // }
}
</script>
