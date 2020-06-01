<template>
  <div>
    <!-- <h1>公告列表</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="zhuce">
        <el-button type="primary" size="small" @click="gotozhuce">
          <i class="el-icon-plus"></i>发布公告
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table :data="tableData" :header-cell-style="headClass" style="width: 100%">
          <el-table-column label="公告标题" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告内容" align="center" min-width="190">
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="hanlddelete (scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 发布公告 -->
    <div class="zhuce">
      <el-dialog :visible.sync="dialogFormVisible" width="30%" @close="closezhuce">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公告标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="公告内容" prop="content">
            <el-input type="textarea" v-model="ruleForm.content"></el-input>
          </el-form-item>

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">{{subtxt}}</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表单数据
      tableData: [
        {
          name: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        },
        {
          name: '王小虎',
          content: '上海市普陀区金沙江路 1519 弄'
        },
        {
          name: '王小虎',
          content: '上海市普陀区金沙江路 1520 弄'
        },
        {
          name: '王小虎',
          content: '上海市普陀区金沙江路 1521 弄'
        }
      ],

      // 输入信息
      ruleForm: {
        // 公告标题
        name: '',
        // 公告内容
        content: ''
      },
      // 输入规则
      rules: {
        // 公告标题
        name: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
        // 公告内容
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
      },

      subtxt: '发布',

      // 发布公告弹框
      dialogFormVisible: false
    }
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 点击注册按钮
    gotozhuce() {
      this.subtxt = '发布'

      this.dialogFormVisible = true
    },

    // 关闭注册
    closezhuce() {
      this.$refs.ruleForm.resetFields()

      this.ruleForm.name = ''
      this.ruleForm.content = ''
    },

    // 发布公告接口
    sendnoice() {
      console.log(this.ruleForm.name, this.ruleForm.content)
    },

    // 提交发布公告按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sendnoice()
        }
      })
    },

    // 取消按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()

      this.dialogFormVisible = false
    },

    // 编辑按钮
    edit(index, row) {
      this.subtxt = '修改'
      // console.log(index, row)
      this.dialogFormVisible = true

      this.ruleForm.name = row.name
      this.ruleForm.content = row.content
    },
    // 删除按钮
    hanlddelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style lang="less">
.bread {
  margin: 12px 35px;
  display: flex;
  justify-content: space-between;
}
.el-breadcrumb {
  line-height: 32px;
}

.el-table td {
  font-size: 12px;
}

// 提交取消方向
.fun {
  text-align: right;
}
</style>
