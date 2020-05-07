<template>
  <div>
    <!-- <h1>账号列表</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>企业用户</el-breadcrumb-item>
        <el-breadcrumb-item>账号列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="zhuce">
        <el-button type="primary" size="small" @click="gotozhuce">
          <i class="el-icon-plus"></i>注册账户
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table :data="tableData" :header-cell-style="headClass" stripe style="width: 100%">
          <el-table-column label="企业名称" align="center" show-overflow-tooltip min-width="60">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="账号昵称" align="center" show-overflow-tooltip min-width="60">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.nick }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="用户名" align="center" show-overflow-tooltip min-width="60">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="电话" align="center" show-overflow-tooltip min-width="60">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.phone }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="紧急联系人" align="center" show-overflow-tooltip min-width="60">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.lianxiren }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="紧急联系人电话" align="center" show-overflow-tooltip min-width="60">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.lxtel }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                <el-button type="text" size="mini" @click="dialogFormVisible = true">绑定设备</el-button>
              </el-button>
              <el-button type="text" @click="getbandeq(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 设备绑定 -->
        <div class="bindbox">
          <el-dialog title="设备绑定" :visible.sync="dialogFormVisible" width="60%" @close="closed1">
            <el-form :model="form">
              <el-form-item label="带漏电" :label-width="formLabelWidth">
                <el-select v-model="form.lou" placeholder="请选择活动区域" @change="geteqtype">
                  <el-option label="带漏电" value="1"></el-option>
                  <el-option label="不带漏电" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="型号" :label-width="formLabelWidth">
                <el-select
                  v-model="form.xinghao"
                  placeholder="请选择活动区域"
                  @change="geteqtype"
                  :disabled="form.lou == '' ? true : false"
                >
                  <el-option label="20A" value="20"></el-option>
                  <el-option label="32A" value="32"></el-option>
                  <el-option label="40A" value="40"></el-option>
                  <el-option label="63A" value="63"></el-option>
                  <el-option label="80A" value="80"></el-option>
                  <el-option label="100A" value="100"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="极数" :label-width="formLabelWidth">
                <el-select
                  v-model="form.jishu"
                  placeholder="请选择活动区域"
                  @change="geteqtype"
                  :disabled="form.xinghao == '' ? true : false"
                >
                  <el-option label="1P" value="1"></el-option>
                  <el-option label="2P" value="2"></el-option>
                  <el-option label="3P" value="3"></el-option>
                  <el-option label="4P" value="4"></el-option>
                </el-select>
              </el-form-item>

              <div class="bangding">
                <template>
                  <el-table :data="tablebang" style="width: 100%" empty-text="暂无设备">
                    <el-table-column label="设备号" align="center" min-width="180">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{
                          hexCharCodeToStr(scope.row.mzid)
                          }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="型号" align="center" min-width="180">
                      <template slot-scope="scope">
                        <span>{{ scope.row.xinghao }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="
                  
                  漏电"
                      align="center"
                      min-width="90"
                    >
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{
                          scope.row.guige
                          }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="规格" align="center" min-width="90">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{
                          scope.row.guige + 'A'
                          }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="极数" align="center" min-width="90">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{
                          scope.row.jishu + 'P'
                          }}
                        </span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" min-width="160">
                      <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="handlebang(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button size="mini" @click="bangidng(scope.$index, scope.row)">绑定</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="unband(scope.$index, scope.row)"
                          v-if="code == 41 || code == 42 || code == 43"
                        >解除绑定</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-form>
          </el-dialog>
        </div>
      </template>
    </div>

    <!-- // code: "1"
    // mozu: "32303139303631353132353531372020"
    // mzid: "34474c3430354b4735563831"
    // lou: 0
    // xinghao: ""
    // guige: ""
    // jishu: ""
    // jianzhu: "219软件开发办公室"
    // mzname: "软件开发部"
    // jihuo: 1577621086-->

    <!-- 查看弹框 -->
    <div class="getbind">
      <el-dialog :visible.sync="dialogFormVisible3" width="95%">
        <div class="look">
          <template>
            <el-table :data="bangeqlist" style="width: 100%" empty-text="暂无设备">
              <el-table-column label=" 版本" align="center" min-width="90">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.code == '1' ? '第一代' : '第二代'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="模组" align="center" min-width="180">
                <template slot-scope="scope">
                  <span>{{ hexCharCodeToStr(scope.row.mozu) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="模组ID" align="center" min-width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    hexCharCodeToStr(scope.row.mzid)
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="漏电" align="center" min-width="90">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.lou == 1 ? '带漏电' : '不带漏电'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label=" 型号" align="center" min-width="90">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.xinghao }}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格" align="center" min-width="90">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.guige + 'A'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="极数" align="center" min-width="90">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.jishu + 'P'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="地址" align="center" min-width="130">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.jianzhu }}</span>
                </template>
              </el-table-column>
              <el-table-column label="部门" align="center" min-width="130">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.mzname }}</span>
                </template>
              </el-table-column>
              <!-- 当前步骤：1入库，2保留，3出库，4保留，5地方仓库，6保留，7客户仓库，8保留，9故障，10保留，11正常运行中，12被删除 -->
              <el-table-column label="状态" align="center" min-width="90">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.bz == '11'
                    ? '正常运行'
                    : scope.row.bz == '12'
                    ? '已删除'
                    : '未激活'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="时间" align="center" min-width="90">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    new Date(scope.row.jihuo * 1000).Format('yy-MM-dd ')
                    }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" @click="handlebang(scope.$index, scope.row)">编辑</el-button> -->
                  <!-- <el-button size="mini" @click="bangidng(scope.$index, scope.row)">绑定</el-button> -->
                  <el-button size="mini" type="danger" @click="unband(scope.$index, scope.row)">解除绑定</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-dialog>
    </div>

    <!-- 注册弹框 -->
    <div class="zhuce">
      <el-dialog title="开通企业账户" :visible.sync="dialogFormVisible2" width="40%" @close="closezhuce">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="qiye">
            <span class="newscover">企业</span>
            <el-select v-model="value" filterable placeholder="请选择企业">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div class="page">
      <div style="line-height:32px;">
        <span>共 {{ total }} 条</span>
      </div>

      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :pageSize="pageSize"
          :total="Number(total)"
          @current-change="tab"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import http from '../../ajax/http'
import $ from 'jquery'

export default {
  data() {
    return {
      // 查看绑定设备数据
      bangeqlist: [],
      // 点击查看
      dialogTableVisible3: false,
      dialogFormVisible3: false,

      // 点击注册
      dialogTableVisible2: false,
      dialogFormVisible2: false,

      // 企业列表
      options: [],
      // 列表绑定value
      value: '',

      ruleForm: {
        nickname: '',
        phone: '',
        username: ''
      },
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      formLabelWidth: '120px',

      // 点击新增
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        lou: '',
        jishu: '',
        xinghao: ''
      },
      formLabelWidth: '72px',

      // loudian1: 1,
      // jisuh1: 0,
      // xinghao: 0,

      code: '',

      // 用户id
      uid: '',

      // 绑定表格
      tablebang: [],

      // 表单数据
      tableData: [],
      // search: ''

      // 总条数
      total: '',
      // 每页条数
      pageSize: 10,
      // 当前页
      page: 0
    }
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 关闭绑定设备刷新界面
    closed1() {
      //   this.$router.go(0)
    },

    // 获取全部企业
    getallcompany() {
      http
        .getallcompany({ uid: localStorage.getItem('uid') })
        .then(res => {
          // console.log(res)
          this.options = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 编辑按钮
    handleEdit(index, row) {
      // console.log(index, row)
      this.uid = this.tableData[index].id
    },
    // 点击确定按钮
    sure() {
      this.dialogFormVisible = false
      // console.log(this.uid)
    },
    // // 删除按钮
    // handleDelete(index, row) {
    //   console.log(index, row)
    // },

    // bindedit
    // 绑定设备按钮
    handlebang() {
      // console.log(this.uid)
    },

    // 点击绑定按钮
    bangidng(index, row) {
      http
        .bangeq({
          uid: this.uid,
          gid: localStorage.getItem('uid'),
          nid: this.tablebang[index].mzid
        })
        .then(res => {
          console.log(res)
          this.code = res.data.code
          if (res.data.code == '41') {
            this.$message({
              showClose: true,
              message: '设备绑定成功',
              type: 'success'
            })
            // this.dialogFormVisible = false
          } else if (res.data.code == '43') {
            this.$message({
              showClose: true,
              message: '该设备已绑定',
              type: 'warning'
            })
          } else {
            this.$message({
              showClose: true,
              message: '设备绑定失败',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击解除绑定
    unband(index, row) {
      // console.log(index, row)
      // console.log(this.tableData[index])
      // return false
      http
        .unbangeq({
          uid: this.tableData[index].id,
          gid: localStorage.getItem('uid'),
          nid: row.mzid
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == '41') {
            this.code = ''
            this.$message({
              showClose: true,
              message: '解除绑定成功',
              type: 'success'
            })
            // this.getbandeq()
            // this.dialogFormVisible = false
          } else if (res.data.code == '43') {
            this.$message({
              showClose: true,
              message: '该设备未绑定',
              type: 'warning'
            })
          } else {
            this.$message({
              showClose: true,
              message: '解除绑定失败',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // // 点击注册
    // gotozhuce() {
    //   this.$router.push({ path: '/openfunuser' })
    // },

    // 点击提交注册
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          if (this.value == '') {
            this.$message({
              showClose: true,
              message: '请选择企业',
              type: 'warning'
            })
          } else {
            http
              .openfunuser({
                nick: this.ruleForm.nickname,
                username: this.ruleForm.username,
                phone: this.ruleForm.phone,
                gid: this.value
              })
              .then(res => {
                if (res.data.code == 7) {
                  // console.log(res)
                  this.$message({
                    message: '开通账户成功',
                    type: 'success'
                  })
                  this.dialogFormVisible2 = false

                  this.$refs.ruleForm.resetFields()
                  this.value = ''

                  this.getuserlist()
                } else if (res.data.code == 5) {
                  // console.log(res)
                  this.$message({
                    message: '给企业已绑定',
                    type: 'warning'
                  })
                } else if (res.data.code == 6) {
                  // console.log(res)
                  this.$message({
                    message: '该用户名已经使用',
                    type: 'warning'
                  })
                }
              })
              .catch(err => {
                console.log(err)
                this.$message.error('开通账户失败')
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置按钮
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.dialogFormVisible2 = false
    },

    // 点击注册
    gotozhuce() {
      this.dialogFormVisible2 = true
    },

    // 查看绑定设备
    getbandeq(row, row2) {
      // console.log(row2)
      this.dialogFormVisible3 = true
      let id = row2.id
      http
        .getbandeq({ uid: id })
        .then(res => {
          // console.log(res)
          this.bangeqlist = res.data.data

          // 查看设备是否出滚动条
          setTimeout(() => {
            // console.log(
            //   $('.getbind')
            //     .find($('.el-table__body-wrapper'))
            //     .css('height')
            // )
            if (
              Number(
                $('.getbind')
                  .find($('.el-table__body-wrapper'))
                  .css('height')
                  .substr(0, 3)
              ) > 500
            ) {
              $('.getbind')
                .find($('.el-table__body-wrapper'))
                .css('overflow-y', 'scroll')
            } else {
              $('.getbind')
                .find($('.el-table__body-wrapper'))
                .css('overflow-y', '')
              console.log('123')
            }
          }, 0)
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 获取用户列表
    getuserlist() {
      http
        .getuserlist({ type: 1, page: this.page })
        .then(res => {
          // console.log(res)
          this.tableData = res.data.data
          this.dialogFormVisible = false
          this.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 分页改变
    tab(page) {
      this.page = page - 1
      this.getuserlist()
    },

    // 检索设备类型
    geteqtype() {
      http
        .geteqtype({
          uid: this.uid,
          lou: this.form.lou,
          jishu: this.form.jishu == '' ? 0 : this.form.jishu,
          guige: this.form.xinghao == '' ? 0 : this.form.xinghao
        })
        .then(res => {
          // console.log(res)
          this.tablebang = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 注册弹框关闭清空内容
    closezhuce() {
      this.$refs.ruleForm.resetFields()

      this.ruleForm.nickname = ''
      this.ruleForm.username = ''
      this.ruleForm.phone = ''
      this.value = ''
    }
  },
  mounted() {
    this.getuserlist()
    this.getallcompany()
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
// .zhuce {
//   position: absolute;
//   right: 90px;
//   top: 80px;
// }

.mymain {
  height: 49rem;
}

.page {
  // width: 40rem;
  // position: relative;
  // bottom: 0px;
  // left: 50%;
  // transform: translate(-50%, 0px);
  margin: 0 0 0 39.5rem;
  display: flex;
  span {
    font-size: 14px;
    color: #666;
  }
}
.himg {
  width: 30px;
  height: 30px;
}

.el-form:nth-of-type(1) {
  display: flex;
  flex-wrap: wrap;
}
.bangding {
  width: 100%;
}

.el-breadcrumb {
  line-height: 32px;
}
.bread {
  margin: 12px 35px;
  display: flex;
  justify-content: space-between;
}

.cell:last-child .el-button:first-child {
  padding: 0 0 !important;
  width: 80px;
  height: 36px;
}

.el-form-item__label {
  width: 88px !important;
}
.el-form-item__content {
  margin-left: 88px !important;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  height: 40% !important;
}

.demo-ruleForm {
  display: block !important;
  width: 600px;
  // text-align: center;
  margin: 0 auto;
}
// 查看绑定
.getbind {
  .el-dialog {
    .el-table--enable-row-transition /deep/ .el-table__body-wrapper {
      // overflow-y: scroll;
      max-height: 600px;
    }
  }
}

.qiye {
  display: flex;
  margin-bottom: 22px;
  padding-left: 64px;
  line-height: 40px;
}
.newscover {
  font-size: 14px;
  color: #606266;
  margin-right: 8px;
}

.fun {
  // margin-left: 280px;
  text-align: end;
}

.el-table /deep/ td {
  padding: 7px 0 !important;
}

// .el-table__row {
//   td {
//     padding: 10px 0 !important;
//   }
// }

.el-dialog {
  margin-top: 10vh !important;
}
// .el-button {
//   // padding: 0 0 !important;
// }
</style>
