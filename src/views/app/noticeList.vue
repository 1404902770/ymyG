<template>
  <div>
    <!-- <h1>公告列表</h1> -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <!-- <el-popover trigger="hover" placement="top"> -->
            <!-- <p>姓名: {{ scope.row.name }}</p> -->
            <!-- <p>住址: {{ scope.row.address }}</p> -->
            <!-- <div slot="reference" class="name-wrapper"> -->
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
            <!-- </div> -->
            <!-- </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="delete (scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表单数据
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    // 编辑按钮
    edit(index, row) {
      console.log(index, row)
    },
    // 删除按钮
    delete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style lang="less">
.el-tag {
  border: none;
  padding: 0;
  background-color: transparent;
  color: #333;
}
</style>
