<template>
  <div>
    <!-- <h1>官网新闻列表</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>官网新闻</el-breadcrumb-item>
        <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="zhuce">
        <el-button type="primary" size="small" @click="gotozhuce">
          <i class="el-icon-plus"></i>添加新闻
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table :data="tableData" :header-cell-style="headClass" stripe style="width: 100%">
          <!-- <el-table-column label="序号" align="center" min-width="30" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>-->

          <el-table-column label="标题" align="center" min-width="30" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型" align="center" min-width="30" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <i class="el-icon-edit xiugai" title="修改新闻" @click="edit(scope.$index, scope.row)"></i>

              <i
                class="el-icon-delete xiugai"
                title="删除新闻"
                @click="handleDelete(scope.$index, scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 发布新闻 -->
    <div class="bindbox">
      <el-dialog :visible.sync="dialogFormVisible" width="40%" @close="closed('ruleForm')">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新闻类型" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择新闻类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="新闻标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <div style="width: 100%; height: 470px;">
            <script id="editor3" type="text/plain" style="width: 100%; height: 300px;"></script>
          </div>

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">立即新增</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改新闻 -->
    <div class="bindbox">
      <el-dialog :visible.sync="dialogFormVisible2" width="40%" @close="closed1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新闻类型" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择新闻类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="新闻标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <div style="width: 100%; height: 470px;">
            <script id="editor4" type="text/plain" style="width: 100%; height: 300px;"></script>
          </div>

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
        { num: '1', title: '社会实践', type: '公司动态' },
        { num: '2', title: '社会实践', type: '媒体焦点' },
        { num: '3', title: '社会实践', type: '科技资讯' }
      ],

      // 新增表单
      ruleForm: {
        name: '',
        region: ''
      },
      // 新增表单规则
      rules: {
        name: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        region: [
          { required: true, message: '请选择新闻类型', trigger: 'change' }
        ]
      },

      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },

      editor3: '',
      editor4: '',
      // 富文本内容
      content: '',

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

    // 关闭新增新闻弹框
    closed(formName) {
      this.$refs[formName].resetFields()

      var ue = UE.getEditor('editor3')
      ue.ready(function() {
        //设置编辑器的内容
        ue.setContent('')
      })
    },

    // 关闭修改新闻弹框
    closed1(row) {
      this.$refs.ruleForm.resetFields()

      var ue1 = UE.getEditor('editor4')
      ue1.ready(function() {
        //设置编辑器的内容
        try {
          ue1.setContent(row)
        } catch (error) {
          // console.log(error)
          return error
        }
      })
    },

    // 删除新闻
    handleDelete() {},

    // 新增新闻
    gotozhuce() {
      let _this = this
      // $('.editor').empty()
      setTimeout(() => {
        // _this.getSrcurl()
        _this.editor3 = window.UE.getEditor('editor3', this.config)
        _this.editor3.addListener('ready', () => {
          _this.editor3.setContent('')
        })
      }, 0)
      this.dialogFormVisible = true
    },

    // 修改新闻
    edit(index, row) {
      this.dialogFormVisible2 = true
      let _this = this

      var timer = setTimeout(() => {
        _this.editor4 = window.UE.getEditor('editor4', _this.config)
        _this.editor4.addListener('ready', () => {
          _this.editor4.setContent('')
        })
        this.closed1('')
      }, 0)
    },

    // 获取富文本内容
    getUEContent() {
      this.content = this.editor.getContent()
    },

    // 立即新增按钮
    submitForm(formName) {
      this.getUEContent()
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 立即修改按钮
    submitFormupdate(formName) {
      this.getUEContent()
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
  },
  destroyed() {
    try {
      this.editor3.destroy()
      this.editor4.destroy()
    } catch (error) {
      // console.log(error)
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
  margin-top: 20px;
  text-align: end;
}

.el-dialog__wrapper .el-dialog {
  margin-top: 9vh !important;
  z-index: 1000 !important;
}
.el-dialog__wrapper {
  z-index: 1000 !important;
}

// /deep/
.el-table td {
  padding: 12px 0 !important;
  font-size: 12px;
}
</style>