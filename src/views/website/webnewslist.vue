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
          <i class="el-icon-plus"></i>发布新闻
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

          <el-table-column label="新闻类型" align="center" min-width="40" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>

          <el-table-column label="新闻标题" align="center" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column label="新闻简介" align="center" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" min-width="30">
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
              <el-option label="公司动态" value="公司动态"></el-option>
              <el-option label="媒体焦点" value="媒体焦点"></el-option>
              <el-option label="科技资讯" value="科技资讯"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="新闻标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="新闻简介" prop="desc">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <div style="width: 100%; height: 470px;">
            <script id="editor3" type="text/plain" style="width: 100%; height: 300px;"></script>
          </div>

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">{{subtext}}</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改新闻 -->
    <!-- <div class="bindbox">
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
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表单数据
      tableData: [
        {
          title: '智慧用电，改写电气安全新格局',
          type: '公司动态',
          desc:
            '改革开放的40年，是我国经济发展书写奇迹的40年。在改革开放的大背景下电力工业走出了一条波澜壮阔的改革突破之路，为经济增长和社会进步提供强有力的保障和巨大动力。实现了历史性的大跨越，让整个世界发生了翻天覆地的变化。'
        },
        {
          title: '智慧用电--电老虎时代终结者！',
          type: '媒体焦点',
          desc:
            '近年来，电气火灾一直呈高发态势。据公安部消防局统计，从已查明原因的火灾看，有10.2万起火灾是由于违反电气安装使用规定引发的，占总数的30.1%，尤其是较大火灾中有56.7%是由于电气原因引发!'
        },
        {
          title: '智慧用电，改写电气安全新格局',
          type: '科技资讯',
          desc:
            '改革开放的40年，是我国经济发展书写奇迹的40年。在改革开放的大背景下电力工业走出了一条波澜壮阔的改革突破之路，为经济增长和社会进步提供强有力的保障和巨大动力。实现了历史性的大跨越，让整个世界发生了翻天覆地的变化。'
        }
      ],

      // 新增表单
      ruleForm: {
        name: '',
        region: '',
        desc: ''
      },
      // 新增表单规则
      rules: {
        name: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        region: [
          { required: true, message: '请选择新闻类型', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请输入新闻简介', trigger: 'blur' }]
      },

      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },

      // 提交按钮文字
      subtext: '',

      // 发布新闻富文本编辑器
      editor3: '',
      // 修改新闻富文本编辑器
      // editor4: '',

      // 新增富文本内容
      content3: '',
      // 修改富文本内容
      content4: '',

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

      this.ruleForm.desc = ''
      this.ruleForm.name = ''
      this.ruleForm.region = ''

      var ue = UE.getEditor('editor3')
      ue.ready(function() {
        //设置编辑器的内容
        ue.setContent('')
      })
    },

    // 关闭修改新闻弹框
    closed1(row) {
      // this.$refs.ruleForm.resetFields()

      var ue1 = UE.getEditor('editor3')
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
    handleDelete(index, row) {
      console.log(index, row)
    },

    // 新增新闻
    gotozhuce() {
      this.subtext = '立即发布'
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
      this.subtext = '立即修改'
      this.dialogFormVisible = true

      this.ruleForm.name = row.title
      this.ruleForm.region = row.type
      this.ruleForm.desc = row.desc

      let _this = this

      var timer = setTimeout(() => {
        _this.editor3 = window.UE.getEditor('editor3', _this.config)
        _this.editor3.addListener('ready', () => {
          _this.editor3.setContent(row.desc)
        })
        this.closed1(row.desc)
      }, 0)
    },

    // 获取添加富文本内容
    getUEContent3() {
      this.content3 = this.editor3.getContent()
    },
    // 获取修改富文本内容
    // getUEContent4() {
    //   this.content4 = this.editor4.getContent()
    // },

    // 立即发布按钮
    submitForm(formName) {
      this.getUEContent3()
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.content3 != '') {
            if (this.subtext == '立即发布') {
              alert('submit!')
            } else {
              alert('update!')
            }
          } else {
            this.$message({
              showClose: true,
              message: '请填写新闻内容后提交',
              type: 'warning'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 立即修改按钮
    // submitFormupdate(formName) {
    //   this.getUEContent4()
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // 取消按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
    }
  },
  mounted() {},

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