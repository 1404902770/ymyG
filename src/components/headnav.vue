<template>
  <div class="headnav">
    <div class="topnav">
      <!-- logo图标 -->
      <div class="logo">
        <img
          class="logopic"
          src="../../public/static/images/logo.png"
          alt
        />
        <span class="logotitle">后台管理系统</span>
      </div>
      <!-- 顶部导航按钮 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        active-text-color="teal"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item
          index="1"
          @click="gotoUser('1')"
        >用户管理</el-menu-item>
        <el-menu-item
          index="2"
          @click="gotoEq('2')"
        >设备管理</el-menu-item>
        <el-menu-item
          index="3"
          @click="gotoSetUp('3')"
        >App设置</el-menu-item>
        <!-- <el-menu-item
          index="4"
          @click="gotoWebSite('4')"
        >官网设置</el-menu-item> -->
      </el-menu>
    </div>
    <!-- 用户信息 -->
    <div class="userInfo">
      <div
        class="jiankong"
        @click="gotoMonitoring"
      >
        <img
          class="jiankongimg"
          src="../../public/static/images/jiankong.png"
          alt=""
        />
        <span>监控</span>
      </div>

      <template v-if="this.lei == 1">
        <div class="userName">总管理员</div>
      </template>
      <template v-else>
        <div class="userName">一级管理员</div>
      </template>
      <!-- <div class="userName">{{this.lei}}</div> -->
      <div class="out">
        <el-dropdown @command="commond">
          <span class="el-dropdown-link">
            <div class="userpic">
              <img
                class="userheadpic"
                src="../..//public/static/images/logo.png"
                alt
              />
            </div>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="line"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // select: [
      //   {
      //     oneTitle: '设备管理',
      //     twoTitle: [
      //       {
      //         title: '设备入库',
      //         path: '/equipment'
      //       },
      //       {
      //         title: '设备管理',
      //         path: '/eqman'
      //       },
      //       {
      //         title: '官网设置',
      //         path: '/newshome'
      //       }
      //     ]
      //   }
      // ],
      // 顶部导航选中项
      activeIndex: '',
      // 用户类型
      lei: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    // 点击进入监控页
    gotoMonitoring() {
      // this.$router.push({ path: "/monitoring" })
      this.$router.push({ path: "/home" })
    },

    // 点击用户管理按钮
    gotoUser(num) {
      this.$router.push({ path: '/funuser' })
      sessionStorage.setItem('num', num)
    },
    // 点击设备管理按钮
    gotoEq(num) {
      this.$router.push({ path: '/eqman' })
      sessionStorage.setItem('num', num)
    },
    // App设置
    gotoSetUp(num) {
      this.$router.push({ path: '/appset' })
      sessionStorage.setItem('num', num)
    },
    // 官网设置
    gotoWebSite(num) {
      this.$router.push({ path: '/newstype' })
      sessionStorage.setItem('num', num)
    },
    // 退出登录
    commond(type) {
      // console.log(type)
      switch (type) {
        case 'logout':
          // 登出
          this.$router.replace({ name: 'Login' })
          sessionStorage.removeItem('num')
          break
        default:
          break
      }
    }
  },
  mounted() {
    this.lei = localStorage.getItem('lei')
    // 初始化activeIndex
    if (sessionStorage.getItem('num')) {
      this.activeIndex = sessionStorage.getItem('num')
    } else {
      this.activeIndex = '1'
    }
  }
}
</script>
<style lang="less">
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
/* 用户信息 */
.userInfo {
  float: right;
  position: absolute;
  top: 15px;
  right: 50px;
  display: flex;
  .jiankong {
    display: flex;
    margin-right: 15px;
    margin-top: -6px;
    flex-direction: column;
    .jiankongimg {
      width: 27px;
    }
    span {
      font-size: 14px;
    }
  }
  .jiankong:hover {
    cursor: pointer;
  }
}
/* 顶部导航 */
.headnav {
  position: relative;
}
.el-menu--horizontal {
  border: none !important;
  // margin-left: 750px !important;
  left: 40%;
  width: 400px;
}
.topnav {
  border-bottom: solid 1px teal;
}
// logo
.logo {
  height: 50px;
  position: absolute;
  top: 6px;
  left: 30px;
  margin-top: 6px;
}
.logopic {
  width: 40px;
  height: 40px;
  margin-right: 20px;
  vertical-align: bottom;
}
.logotitle {
  font-size: 15px;
  font-weight: 600;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
// 用户头像
.userheadpic {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.el-dropdown-link {
  display: flex;
}
// 右侧箭头
.el-icon--right {
  margin-top: 10px;
}
// 用户名
.userName {
  margin-top: 4px;
  margin-right: 5px;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border: none !important;
}

.el-header {
  padding: 0 0 !important;
}
</style>
