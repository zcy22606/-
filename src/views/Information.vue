<template> <!-- vue实例外创建 -->
    <div>
        <navbar></navbar>
        我是资讯内容
    </div>
</template>

<script>
import navbar from '../components/navbar'
export default {
  components: {
    navbar
  }
}
</script>

<style lang="scss" scoped>
  $master_color:#ff5f16;
  $line: 1px solid #ededed;
</style>
