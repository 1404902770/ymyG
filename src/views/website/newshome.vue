<template>
  <div class="home">
    <el-container>
      <el-header>
        <!-- 顶部导航 -->
        <headmenu></headmenu>
      </el-header>
      <el-container>
        <el-aside width="210px">
          <!-- 左侧导航 -->
          <websiteasdie></websiteasdie>
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
import websiteasdie from '../../components/websiteAside'

export default {
  data() {
    return {
      a: '124',
      b: '1'
    }
  },
  methods: {},
  components: {
    headmenu,
    websiteasdie
  },
  mounted() {}
}
</script>
<style lang="less">
.el-aside {
  margin-top: 1px;
  height: 100%;
}
.el-main {
  margin-top: 61px;
  margin-left: 210px;
}
.el-header {
  position: fixed;
  width: 100%;
  background: white;
  z-index: 999;
}
.el-aside {
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
.el-col-12 {
  height: 100%;
}
</style>
