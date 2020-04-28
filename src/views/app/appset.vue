<template>
  <div>
    <el-container>
      <el-header>
        <!-- 顶部导航 -->
        <headnav></headnav>
      </el-header>
      <el-container>
        <el-aside width="410px">
          <!-- 左侧导航 -->
          <appasdie></appasdie>
        </el-aside>
        <el-main>
          <!-- 主体部分 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import headnav from '../../components/headnav'
import appasdie from '../../components/appSetAside'

export default {
  data() {
    return {}
  },
  methods: {},
  components: {
    headnav,
    appasdie
  }
}
</script>
<style lang="less" scoped>
.el-col-12 .el-aside {
  height: 100%;
}
</style>
