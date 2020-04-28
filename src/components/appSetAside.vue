<template>
  <div class="contbox">
    <el-aside width="300px">
      <el-col :span="12">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          unique-opened
          router
          collapse-transition
        >
          <template v-for="item in routers">
            <template v-if="item.twoTitle">
              <el-submenu :index="item.oneTitle" :key="item.oneTitle" style="text-align: left;">
                <template slot="title">
                  <i v-if="item.oneTitle=='App设置'" class="el-icon-setting"></i>
                  <i v-if="item.oneTitle=='轮播图管理'" class="el-icon-picture-outline"></i>
                  <i v-if="item.oneTitle=='新闻管理'" class="el-icon-news"></i>
                  <i v-if="item.oneTitle=='公告管理'" class="el-icon-reading"></i>
                  <span>{{ item.oneTitle }}</span>
                </template>
                <el-menu-item
                  v-for="(item, index) in item.twoTitle"
                  :key="index"
                  :index="item.path"
                >
                  <i v-if="item.title=='版本更新'" class="el-icon-upload2"></i>
                  {{ item.title }}
                </el-menu-item>
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
          oneTitle: 'App设置',
          twoTitle: [
            {
              title: '版本更新',
              path: '/appset'
            }
          ]
        },
        {
          oneTitle: '公告管理',
          twoTitle: [
            {
              title: '发布公告',
              path: '/sendnotice'
            },
            {
              title: '公告列表',
              path: '/noticelist'
            }
          ]
        },
        {
          oneTitle: '轮播图管理',
          twoTitle: [
            {
              title: '轮播图列表',
              path: '/bannerlist'
            }
          ]
        },
        {
          oneTitle: '新闻管理',
          twoTitle: [
            {
              title: '新闻列表',
              path: '/newslist'
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>

<style>
.el-aside {
  /* font-weight: bold; */
  width: 210px !important;
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
  height: 100%;
}
</style>
