<template>
  <div>
    <!-- <h1>官网留言板</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>官网留言</el-breadcrumb-item>
        <el-breadcrumb-item>留言列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="mymain">
      <template>
        <el-table
          :data="tableData"
          empty-text="暂无留言"
          :header-cell-style="headClass"
          stripe
          style="width: 100%"
        >
          <el-table-column label="留言时间" align="center" min-width="40" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>

          <el-table-column label="留言姓名" align="center" min-width="40" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="留言电话" align="center" min-width="50" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="留言邮箱" align="center" min-width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>

          <el-table-column label="留言" align="center" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.message }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" min-width="30">
            <template slot-scope="scope">
              <i
                class="el-icon-delete xiugai"
                title="删除留言"
                @click="handleDelete(scope.$index, scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表格数据
      tableData: [
        {
          time: '2020-6-1',
          name: '俊熙',
          phone: '10086',
          email: 'yumaoyoukeji@163.com',
          message: '公司动态'
        },
        {
          time: '2020-6-2',
          name: '白浩',
          phone: '10000',
          email: 'yumaoyoukeji@163.com',
          message: '媒体焦点'
        },
        {
          time: '2020-6-3',
          name: '筱风',
          phone: '10010',
          email: 'yumaoyoukeji@163.com',
          message: '科技资讯'
        }
      ]
    }
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 关闭新增类型弹框
    closed(formName) {
      this.$refs[formName].resetFields()
    },

    // 删除类型
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style lang='less'>
.bread {
  margin: 12px 35px;
  display: flex;
  justify-content: space-between;
}
.el-breadcrumb {
  line-height: 32px;
}

.xiugai {
  padding: 5px;
  cursor: pointer;
}
.xiugai:hover {
  color: teal;
}

.fun {
  text-align: end;
}

// /deep/
.el-table td {
  padding: 12px 0 !important;
  font-size: 12px;
}
</style>