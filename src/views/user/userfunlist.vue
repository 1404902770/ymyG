<template>
  <div>
    <!-- <h1>账号管理</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人用户</el-breadcrumb-item>
        <el-breadcrumb-item>账号列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户名称" align="center" show-overflow-tooltip min-width="100">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="证件号" align="center" show-overflow-tooltip min-width="100">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.zjhao }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="地区" align="center" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag size="medium">
              {{
              scope.row.priv + '/' + scope.row.shi + '/' + scope.row.xian
              }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="详细地址" align="center" show-overflow-tooltip min-width="100">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.xiang }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="紧急联系人" align="center" show-overflow-tooltip min-width="100">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.lianxiren }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="紧急联系人电话" align="center" show-overflow-tooltip min-width="100">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.lxtel }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="备注信息" align="center" show-overflow-tooltip min-width="100">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.beizhu }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <div class="zhuce">
      <el-button round size="small" @click="gotozhuce">
        <i class="el-icon-plus"></i>注册账户
      </el-button>
    </div>
  </div>
</template>
<script>
import http from '../../ajax/http'

export default {
  data() {
    return {
      // 表单数据
      tableData: []
      // search: ''
    }
  },
  methods: {
    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row)
      // this.$router.push({ name: 'Account', params: row })
    },
    // 删除按钮
    handleDelete(index, row) {
      console.log(index, row)
    },

    // 获取个人账号列表
    getuserlist() {
      http
        .getlist({ page: 1, type: 2, uid: localStorage.getItem('uid') })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点击注册
    gotozhuce() {
      this.$router.push({ path: '/adduser' })
    }
  },
  mounted() {
    this.getuserlist()
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  border: none !important;
  padding: 0 !important;
  background-color: transparent !important;
  color: #333 !important;
}
// 注册按钮
.zhuce {
  position: absolute;
  right: 90px;
  top: 72px;
}
.bread {
  margin: 20px 0;
}
</style>
