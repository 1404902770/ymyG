<template>
  <div class="home">
    <el-container>
      <el-header>
        <!-- 顶部导航 -->
        <headmenu></headmenu>
      </el-header>
      <el-container>
        <el-aside width="410px">
          <!-- 左侧导航 -->
          <userasdie></userasdie>
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
import headmenu from '../../components/headnav'
import userasdie from '../../components/userAside'

export default {
  data() {
    return {}
  },
  components: {
    headmenu,
    userasdie
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background-size: 100% auto;
}
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
}
.el-main {
  margin-top: 61px;
  margin-left: 210px;
}
.el-col-12 {
  height: 100%;
}
</style>
