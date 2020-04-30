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
.el-aside {
  margin-top: 1px;
  height: 100%;
}
.el-header {
  position: fixed;
  width: 100%;
  background: white;
  z-index: 999;
}
.el-aside {
  width: 210px !important;
  background: white;
  position: fixed;
  top: 61px;
  left: 0;
  z-index: 10;
}
.el-main {
  margin-top: 61px;
  margin-left: 210px;
}
.el-col-12 .el-aside {
  height: 100%;
}
</style>
