<template>
  <div>
    <!-- <h1>新闻类型</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>官网新闻</el-breadcrumb-item>
        <el-breadcrumb-item>新闻类型</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="zhuce">
        <el-button type="primary" size="small" @click="gotozhuce">
          <i class="el-icon-plus"></i>添加类型
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table :data="tableData" :header-cell-style="headClass" stripe style="width: 100%">
          <el-table-column label="序号" align="center" min-width="30" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型" align="center" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" min-width="30">
            <template slot-scope="scope">
              <i
                class="el-icon-delete xiugai"
                title="删除账号"
                @click="handleDelete(scope.$index, scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 新增类型 -->
    <div class="bindbox">
      <el-dialog :visible.sync="dialogFormVisible" width="30%" @close="closed('ruleForm')">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新闻类型" prop="type">
            <el-input v-model="ruleForm.type"></el-input>
          </el-form-item>

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
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
        { num: '1', phone: '公司动态' },
        { num: '2', phone: '媒体焦点' },
        { num: '3', phone: '科技资讯' }
      ],

      // 新增表单
      ruleForm: {
        type: ''
      },
      // 新增表单规则
      rules: {
        type: [{ required: true, message: '请输入类型', trigger: 'blur' }]
      },

      // 点击新增
      dialogFormVisible: false,
      formLabelWidth: '72px'
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
    handleDelete() {},

    // 检索设备类型
    geteqtype() {},

    // 新增类型
    gotozhuce() {
      this.dialogFormVisible = true
    },

    // 立即新增按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
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