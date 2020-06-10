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
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>

          <el-table-column label="招聘职位" align="center" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                {{ scope.row.position
                }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="招聘人数" align="center" min-width="30" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>

          <el-table-column label="工作地点" align="center" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系人" align="center" min-width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.user }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系邮箱" align="center" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.useremail }}</span>
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

          <p class="position">任职要求</p>
          <div ref="editor" id="editor" class="editor"></div>

          <!-- <el-form-item label="任职要求" prop="desc">
            <el-input type="textarea" rows="6" v-model="ruleForm.desc"></el-input>
          </el-form-item>-->

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">{{subtext}}</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改招聘 -->
    <!-- <div class="bindbox">
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
    </div>-->
  </div>
</template>
<script>
import E from 'wangeditor'
import $ from 'jquery'

export default {
  data() {
    return {
      // 表单数据
      tableData: [
        {
          time: '2020-6-1',
          num: '1',
          position: '测试工程师',
          address: '河北省秦皇岛市海港区华山中路8号银通大厦216',
          user: '王女士',
          useremail: 'ymyqhd@163.com',
          phone: '18103330332',
          desc:
            '<p>任职要求：</p><p>1、22岁-32岁，全日制本科以上学历；</p><p>2、有2年以上产品测试工作经验，能熟练编写完成测试方案及报告等文档；</p><p>3、掌握基本的测试规范和测试要点，会使用常用的测试仪器；</p><p>4、对测试感兴趣，有较强的责任心和原则性；</p><p>5、具有较强的沟通能力，组织、协调能力和动手能力能力；</p><p>6、身体健康，无不良工作记录，具良好的职业操守。</p>'
        },
        {
          time: '2020-6-1',
          num: '1',
          position: 'UI设计师',
          address: '河北省秦皇岛市海港区华山中路8号银通大厦216',
          user: '王女士',
          useremail: 'ymyqhd@163.com',
          phone: '18103330332',
          desc:
            '<p>任职要求：</p><p>1、设计相关专业，专科及以上学历；</p><p>2、对色彩敏感，强烈的产品设计理念和创新创作习惯；</p><p>3、懂得人体工程学的基本原理，对用户操作习惯感知敏感；</p><p>4、对程序逻辑有基本的认知；</p><p>5、精通PHOTOSHOP,AI,CDR等设计技术；</p><p>6、会操作单反相机，根据光学原理拍摄高品质的主题静态产品图；</p><p>7、熟悉使用SVN等代码管理库的使用；</p><p>8、在设计届砍获知名奖章者优先；</p>'
        },
        {
          time: '2020-6-1',
          num: '1',
          position: '销售经理',
          address: '河北省秦皇岛市海港区华山中路8号银通大厦216',
          user: '王女士',
          useremail: 'ymyqhd@163.com',
          phone: '18103330332',
          desc:
            '<p>任职要求：</p><p>1、22岁-32岁，全日制本科以上学历；</p><p>2、B2B网站上面发布供应信息；</p><p>3、通过网站、微信及QQ等寻找意向客户；</p><p>4、定期完成量化的工作要求，并能独立处理和解决所负责的任务；</p><p>5、具有较强的沟通能力，组织、协调能力和动手能力能力；</p><p>6、跟踪客户，下单及回款；</p><p>7、与其他部门的协调；</p><p>8、上级领导临时加派的任务或事项的处理。。</p>'
        }
      ],

      // 富文本容器
      editor: null,

      // 富文本内容
      content: '',

      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },

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
        phone: ''
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
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      },

      // 新增或修改文字
      subtext: '',
      // 点击新增
      dialogFormVisible: false
      // 点击修改
      // dialogFormVisible2: false,
    }
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 富文本
    getSrcurl() {
      this.setEditor(1, 2)
    },
    setEditor(srcurl, pushfunc) {
      // 初始化编辑器
      this.editor = new E(this.$refs.editor)
      // this.editor.config.uploadImgUrl = '/capi/zc'
      // this.editor.customConfig.uploadImgServer =
      //   'http://a.yumaoyou.cn:8008/static/zcimg'
      this.editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgMaxLength = 1
      this.editor.customConfig.withCredentials = true
      this.editor.customConfig.pasteFilterStyle = false
      // this.editor.customConfig.uploadImgHooks = {
      //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      //   customInsert: function(insertImg, result, editor) {
      //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
      //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
      //     // result 必须是一个 JSON 格式字符串！！！否则报错
      //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
      //     insertImg(result.msg)
      //     pushfunc(result.dto)
      //     // console.log(result.dto, result.msg)
      //   }
      // }

      this.editor.customConfig.onchange = html => {
        this.content = html
      }
      var MenuConstructors = {}
      function look() {}
      MenuConstructors.look = look

      this.editor.create()
    },

    // 关闭新增弹框
    closed(formName) {
      $('#editor').empty() //利用jquery的方法对id为"editor"的div清空div中元素,防止富文本重复出现。

      this.$refs[formName].resetFields()

      this.content = ''
      this.ruleForm.position = ''
      this.ruleForm.num = ''
      this.ruleForm.address = ''
      this.ruleForm.user = ''
      this.ruleForm.useremail = ''
      this.ruleForm.phone = ''
    },

    // 删除招聘信息
    handleDelete(index, row) {
      console.log(index, row)
    },

    // 新增招聘信息
    gotozhuce() {
      setTimeout(() => {
        this.getSrcurl()
      }, 0)

      this.subtext = '立即新增'
      this.dialogFormVisible = true
    },

    // 修改招聘信息
    edit(index, row) {
      this.subtext = '立即修改'
      this.content = row.desc
      let _this = this

      setTimeout(() => {
        _this.getSrcurl()
        _this.editor.txt.html(this.content)
      }, 0)

      this.ruleForm.position = row.position
      this.ruleForm.num = row.num
      this.ruleForm.address = row.address
      this.ruleForm.user = row.user
      this.ruleForm.useremail = row.useremail
      this.ruleForm.phone = row.phone

      this.dialogFormVisible = true
    },

    // 立即新增按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.content != '') {
            if (this.subtext == '立即新增') {
              alert('submit!')
            } else {
              alert('update!')
            }
          } else {
            this.$message({
              showClose: true,
              message: '请填写任职要求',
              type: 'warning'
            })
          }
          // console.log(this.ruleForm)
          // console.log(this.editor.txt.html())
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 立即修改按钮
    // submitFormupdate(formName) {
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
  mounted() {}
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
  margin-top: 20px;
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

// 职位要求文字
.position {
  margin-top: 0 !important;
}
</style>