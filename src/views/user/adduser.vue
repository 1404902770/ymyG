<template>
  <div>
    <h1>添加个人用户</h1>
    <div class="back">
      <el-button @click="back" size="small">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 返回按钮
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang=""></style>
