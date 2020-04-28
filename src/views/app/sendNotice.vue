<template>
  <div>
    <h1>发布公告</h1>
    <el-input v-model="input" type="textarea" placeholder="请输入内容"></el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
<style lang="less">
.el-textarea__inner {
  resize: none;
}
</style>
