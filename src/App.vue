<template>
  <div id="app">
    <!-- <headnav></headnav> -->
    <router-view />

    <!-- 脚注 -->
    <!-- <div class="footer"></div> -->
  </div>
</template>
<script>
// import headnav from './components/headnav'
export default {
  data() {
    return {}
  },
  components: {
    // headnav
  },
  methods: {}
}
</script>

<style lang="less">
.footer {
  width: 100%;
  height: 300px;

  position: relative;
  z-index: 100;
  background: teal;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0 0;
  margin: 0 0;
}
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
.el-main {
  padding: 0 0 !important;
  margin-top: 61px;
  margin-left: 210px;
}
.el-submenu .el-menu-item {
  padding-left: 50px !important;
}

.v-modal {
  z-index: 999 !important;
}
</style>
