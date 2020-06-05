<template>
  <div>
    <!-- <h1>招贤纳士</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>招贤纳士</el-breadcrumb-item>
        <el-breadcrumb-item>招聘列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="zhuce">
        <el-button type="primary" size="small" @click="gotozhuce">
          <i class="el-icon-plus"></i>添加招聘
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table :data="tableData" :header-cell-style="headClass" stripe style="width: 100%">
          <el-table-column label="发布日期" align="center" min-width="50" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>

          <el-table-column label="招聘职位" align="center" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>

          <el-table-column label="招聘人数" align="center" min-width="30" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="工作地点" align="center" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系人" align="center" min-width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系邮箱" align="center" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系电话" align="center" min-width="90" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <i class="el-icon-edit xiugai" title="修改招聘" @click="edit(scope.$index, scope.row)"></i>
              <i
                class="el-icon-delete xiugai"
                title="删除招聘"
                @click="handleDelete(scope.$index, scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 新增招聘 -->
    <div class="bindbox">
      <el-dialog :visible.sync="dialogFormVisible" width="40%" @close="closed('ruleForm')">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="box">
            <div class="one">
              <el-form-item label="招聘职位" prop="position">
                <el-input v-model="ruleForm.position"></el-input>
              </el-form-item>

              <el-form-item label="招聘人数" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
              </el-form-item>

              <el-form-item label="工作地点" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
            </div>

            <div class="two">
              <el-form-item label="联系人" prop="user">
                <el-input v-model="ruleForm.user"></el-input>
              </el-form-item>

              <el-form-item label="联系邮箱" prop="useremail">
                <el-input v-model="ruleForm.useremail"></el-input>
              </el-form-item>

              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
            </div>
          </div>

          <el-form-item label="任职要求" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">立即新增</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改招聘 -->
    <div class="bindbox">
      <el-dialog :visible.sync="dialogFormVisible2" width="40%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="box">
            <div class="one">
              <el-form-item label="招聘职位" prop="position">
                <el-input v-model="ruleForm.position"></el-input>
              </el-form-item>

              <el-form-item label="招聘人数" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
              </el-form-item>

              <el-form-item label="工作地点" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
            </div>

            <div class="two">
              <el-form-item label="联系人" prop="user">
                <el-input v-model="ruleForm.user"></el-input>
              </el-form-item>

              <el-form-item label="联系邮箱" prop="useremail">
                <el-input v-model="ruleForm.useremail"></el-input>
              </el-form-item>

              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
            </div>
          </div>

          <el-form-item label="任职要求" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <el-form-item class="fun">
            <el-button type="primary" @click="submitFormupdate('ruleForm')">立即修改</el-button>
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
        // 招聘职位
        position: '',
        // 招聘人数
        num: '',
        // 工作地点
        address: '',
        // 联系人
        user: '',
        // 联系邮箱
        useremail: '',
        // 联系电话
        phone: '',
        // 任职要求
        desc: ''
      },
      // 新增表单规则
      rules: {
        position: [
          { required: true, message: '请输入招聘职位', trigger: 'blur' }
        ],
        num: [{ required: true, message: '请输入招聘人数', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入工作地点', trigger: 'blur' }
        ],
        user: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        useremail: [
          { required: true, message: '请输入联系邮箱', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入任职要求', trigger: 'blur' }]
      },

      // 点击新增
      dialogFormVisible: false,
      // 点击修改
      dialogFormVisible2: false,
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

    // 删除招聘信息
    handleDelete() {},

    // 新增招聘信息
    gotozhuce() {
      this.dialogFormVisible = true
    },

    // 修改招聘信息
    edit(index, row) {
      this.dialogFormVisible2 = true
    },

    // 立即新增按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 立即修改按钮
    submitFormupdate(formName) {
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
      this.dialogFormVisible2 = false
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

.box {
  display: flex;
  .one,
  .two {
    flex: 1;
  }
}

// /deep/
.el-table td {
  padding: 12px 0 !important;
  font-size: 12px;
}
</style>