<template>
  <div>
    <button @click="back">返回</button>
    <button>login</button>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  $master_color:#ff5f16;
  $line: 1px solid #ededed;
</style>
