<template>
  <div class="headnav">
    <div class="topnav">
      <!-- logo图标 -->
      <div class="logo">
        <img class="logopic" src="../../public/static/images/logo.png" alt />
        <span class="logotitle">后台管理系统</span>
      </div>
      <!-- 顶部导航按钮 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="1" @click="gotoUser('1')">用户管理</el-menu-item>
        <el-menu-item index="2" @click="gotoEq('2')">设备管理</el-menu-item>
        <el-menu-item index="3" @click="gotoSetUp('3')">App设置</el-menu-item>
      </el-menu>
    </div>
    <!-- 用户信息 -->
    <div class="userInfo">
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
              <img class="userheadpic" src="../..//public/static/images/logo.png" alt />
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
      select: [
        {
          oneTitle: '设备管理',
          twoTitle: [
            {
              title: '设备入库',
              path: '/equipment'
            },
            {
              title: '设备管理',
              path: '/eqman'
            }
          ]
        }
      ],
      // 顶部导航选中项
      activeIndex: '',
      // 用户类型
      lei: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
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
}
/* 顶部导航 */
.headnav {
  position: relative;
}
.el-menu--horizontal {
  border: none !important;
  // margin-left: 750px !important;
  left: 41%;
  width: 400px;
}
.topnav {
  border-bottom: solid 1px #e6e6e6;
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
  width: 35px;
  height: 35px;
  margin-right: 10px;
  vertical-align: bottom;
}
.logotitle {
  font-weight: bold;
  font-size: 26px;
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

.el-header {
  padding: 0 0 !important;
}
</style>
