<template>
  <div class="contbox">
    <el-aside width="300px" z-index="10">
      <el-col :span="12">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
          <template v-for="item in routers">
            <template v-if="item.twoTitle">
              <el-submenu :index="item.oneTitle" :key="item.oneTitle" style="text-align: left;">
                <template slot="title">
                  <i v-if="item.oneTitle == '企业用户'" class="el-icon-office-building"></i>
                  <i v-if="item.oneTitle == '个人用户'" class="el-icon-user"></i>
                  <span>{{ item.oneTitle }}</span>
                </template>
                <el-menu-item
                  v-for="(item, index) in item.twoTitle"
                  :key="index"
                  :index="item.path"
                >{{ item.title }}</el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.path" :key="item.path" style="text-align: left;">
                <span slot="title">{{ item.oneTitle }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-col>
    </el-aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 用户管理数据
      routers: [
        {
          oneTitle: '官网新闻',
          twoTitle: [
            {
              title: '新闻类型',
              path: '/newstype'
            },
            {
              title: '新闻列表',
              path: '/webnewslist'
            }
          ]
        },
        {
          oneTitle: '官网留言',
          twoTitle: [
            {
              title: '留言列表',
              path: '/leavemessage'
            }
          ]
        },
        {
          oneTitle: '招贤纳士',
          twoTitle: [
            {
              title: '招聘列表',
              path: '/recruiting'
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.el-aside {
  width: 210px !important;
  z-index: 10 !important;
}
.el-col-12 {
  width: 100% !important;
}
/* .el-menu {
  height: 100% !important;
} */
.contbox,
.el-aside,
.el-col-12,
.el-menu {
  height: 100% !important;
}
</style>
