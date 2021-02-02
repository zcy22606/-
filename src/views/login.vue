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
