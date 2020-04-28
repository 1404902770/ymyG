<template>
  <div class="contbox">
    <el-aside width="300px">
      <el-col :span="12">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
          <template v-for="item in select">
            <template v-if="item.twoTitle">
              <el-submenu :index="item.oneTitle" :key="item.oneTitle" style="text-align: left;">
                <template slot="title">
                  <i v-if="item.oneTitle=='设备管理'" class="el-icon-printer"></i>
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
      //设备管理数据
      select: [
        {
          oneTitle: '设备管理',
          twoTitle: [
            {
              title: '设备列表',
              path: '/eqman'
            }
            // {
            //   title: '设备入库',
            //   path: '/equipment'
            // }
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
  width: 210px !important;
}
.el-col-12 {
  width: 100% !important;
}
.el-menu {
  height: 100%;
}
</style>
