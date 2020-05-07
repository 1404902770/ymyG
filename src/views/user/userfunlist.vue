<template>
  <div>
    <!-- <h1>个人账号管理</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人用户</el-breadcrumb-item>
        <el-breadcrumb-item>账号列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="zhuce">
        <el-button type="primary" size="small" @click="gotozhuce">
          <i class="el-icon-plus"></i>注册账号
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table :data="tableData" :header-cell-style="headClass" style="width: 100%">
          <el-table-column label="用户名称" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="用户账号" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.zjhao }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="联系电话" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.call }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="地区" align="center" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag size="medium">
                {{
                scope.row.priv + '-' + scope.row.shi + '-' + scope.row.xian
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
              <i class="el-icon-edit xiugai" @click="handleEdit(scope.$index, scope.row)"></i>
              <i class="el-icon-delete xiugai" @click="handleDelete(scope.$index, scope.row)"></i>
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 个人注册 -->
    <div class="zhuce">
      <el-dialog :visible.sync="dialogFormVisible" width="45%" @close="closezhuce">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="box">
            <div class="one">
              <el-form-item label="用户名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="用户账号" prop="userid">
                <el-input v-model="ruleForm.userid"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="call">
                <el-input v-model.number="ruleForm.call"></el-input>
              </el-form-item>
            </div>
            <div class="two">
              <el-form-item label="紧急联系人" prop="user">
                <el-input v-model="ruleForm.user"></el-input>
              </el-form-item>
              <el-form-item label="紧急电话" prop="alarmcall">
                <el-input v-model.number="ruleForm.alarmcall"></el-input>
              </el-form-item>
            </div>
          </div>

          <!-- 省市区选择 -->
          <div class="region">
            <span class="newscover">选择地区</span>
            <v-distpicker
              :province="temp.address__province"
              :city="temp.address__city"
              :area="temp.address__dist"
              @selected="onSelected"
            ></v-distpicker>
          </div>

          <el-form-item label="详细地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>

          <el-form-item label="备注信息" prop="note">
            <el-input type="textarea" v-model="ruleForm.note"></el-input>
          </el-form-item>

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">{{subtext}}</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 分页 -->
    <div v-if="total!=''" class="page">
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
import VDistpicker from 'v-distpicker'
import { Alert } from 'element-ui'

export default {
  data() {
    return {
      // 表单数据
      tableData: [
        {
          name: '俊熙',
          zjhao: '123465',
          priv: '河北省',
          shi: '秦皇岛市',
          xian: '海港区',
          lianxiren: '白泽',
          call: '123456',
          xiang: '经济技术开发区',
          lxtel: '123546',
          beizhu: '暂无'
        }
      ],

      // 提交注册或者修改
      tag: '',

      // 提交按钮的文字
      subtext: '',

      // 总条数
      total: '',
      // 每页条数
      pageSize: 10,
      // 当前页
      page: '1',

      // 输入信息
      ruleForm: {
        // 账户名称
        name: '',
        // 用户账号
        userid: '',
        // 用户电话
        call: '',
        // 用户地址
        address: '',
        // 联系人
        user: '',
        // 报警电话
        alarmcall: '',
        // 账户类型
        // region: '',
        // 账户权限
        // type: [],
        // 账户
        // resource: '',
        // 备注信息
        note: ''
      },
      // 输入规则
      rules: {
        // 账户名称规则
        name: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 用户证件号
        userid: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        // 用户电话
        call: [
          { required: true, message: '请输入用户号码', trigger: 'blur' },
          { type: 'number', message: '电话必须为数字值' }
        ],
        // 用户地址
        address: [
          { required: true, message: '请输入用户地址', trigger: 'blur' }
        ],
        // 联系人
        user: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        // 报警电话
        alarmcall: [
          { required: true, message: '请输入紧急联系人电话', trigger: 'blur' },
          { type: 'number', message: '电话必须为数字值' }
        ],
        // 账户类型
        // region: [
        //   { required: true, message: '请选择账户类型', trigger: 'change' }
        // ],
        // 账户权限
        // type: [
        //   {
        //     type: 'array',
        //     required: true,
        //     message: '请至少选择一个账户权限',
        //     trigger: 'change'
        //   }
        // ],
        // 账户
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // 行业分类
        // sorts: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        // 备注信息
        note: [{ message: '请选择分类', trigger: 'blur' }]
      },

      // 省市区信息
      temp: {
        address__province: '',
        address__city: '',
        address__dist: ''
      },

      // search: ''
      // dialogTableVisible: false,
      dialogFormVisible: false
    }
  },

  components: { VDistpicker },

  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 关闭注册
    closezhuce() {
      console.log('123')
      this.$refs.ruleForm.resetFields()

      this.ruleForm.name = ''
      this.ruleForm.userid = ''
      this.ruleForm.call = ''
      this.ruleForm.address = ''
      this.ruleForm.user = ''
      this.ruleForm.alarmcall = ''
      this.ruleForm.note = ''

      this.temp.address__province = ''
      this.temp.address__city = ''
      this.temp.address__dist = ''
    },

    // 编辑按钮
    handleEdit(index, row) {
      this.subtext = '立即修改'
      this.tag = '1'
      console.log(index, row)
      this.dialogFormVisible = true
      this.ruleForm.name = row.name
      this.ruleForm.userid = row.zjhao
      this.ruleForm.call = Number(row.call)
      this.ruleForm.address = row.xiang
      this.ruleForm.user = row.lianxiren
      this.ruleForm.alarmcall = Number(row.lxtel)
      this.ruleForm.note = row.beizhu
      this.temp.address__province = row.priv
      this.temp.address__city = row.shi
      this.temp.address__dist = row.xian
    },
    // 删除按钮
    handleDelete(index, row) {
      console.log(index, row)
    },

    // 获取个人账号列表
    getuserlist() {
      http
        .getlist({ page: this.page, type: 2, uid: localStorage.getItem('uid') })
        .then(res => {
          console.log(res)
          // this.tableData = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 选择省市区
    onSelected(data) {
      // console.log(data)
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__dist = data.area.value
    },

    // 点击注册
    gotozhuce() {
      this.subtext = '立即注册'
      this.tag = '0'
      this.dialogFormVisible = true
    },

    // 提交注册账号
    sendregister() {
      http
        .registeruser({
          name: this.ruleForm.name,
          userid: this.ruleForm.userid,
          call: this.ruleForm.call,
          address: this.ruleForm.address,
          user: this.ruleForm.user,
          alarmcall: this.ruleForm.alarmcall,
          note: this.ruleForm.note,
          sheng: this.temp.address__province,
          shi: this.temp.address__city,
          xian: this.temp.address__dist
        })
        .then(res => {
          console.log(res)
          if (res.code == 13) {
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            })
            // 清空表单
            this.$refs.ruleForm.resetFields()
            // 关闭弹框
            this.dialogFormVisible = false
            // 清空省市区选择
            this.temp.address__province = ''
            this.temp.address__city = ''
            this.temp.address__dist = ''
          } else {
            this.$message({
              showClose: true,
              message: '注册失败',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 提交按钮
    submitForm(formName) {
      console.log(this.ruleForm)
      console.log(this.temp)

      this.$refs[formName].validate(valid => {
        // if (valid) {
        if (this.temp.address__dist == '') {
          this.$message({
            showClose: true,
            message: '请选择地区',
            type: 'warning'
          })
        } else {
          if (this.tag == '0') {
            // this.sendregister()
            console.log('注册成功')
          } else {
            console.log('修改成功')
          }
        }
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
      })
    },

    // 重置按钮
    resetForm(formName) {
      // this.$refs[formName].resetFields()

      this.dialogFormVisible = false
      // this.dialogFormVisible2 = false
      // this.dialogFormVisible3 = false

      // this.temp.address__province = ''
      // this.temp.address__city = ''
      // this.temp.address__dist = ''
    },

    // 分页改变
    tab(page) {
      this.page = page
      this.getuserlist()
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
.region {
  display: flex;
  line-height: 40px;
  margin-bottom: 20px;
  padding-left: 36px;
}
.newscover {
  font-size: 14px;
  color: #606266;
  margin-right: 8px;
}

.xiugai {
  padding: 5px;
  cursor: pointer;
}
.xiugai:hover {
  color: teal;
}

.mymain {
  height: 49rem;
}

.page {
  margin: 0 0 0 39rem;
  display: flex;
  span {
    font-size: 14px;
    color: #666;
  }
}

.box {
  display: flex;
}
.one,
.two {
  flex: 1;
}

.fun {
  text-align: right;
}

// 注册按钮
// .zhuce {
//   position: absolute;
//   right: 90px;
//   top: 72px;
// }

.el-breadcrumb {
  line-height: 32px;
}
.bread {
  margin: 12px 35px;
  display: flex;
  justify-content: space-between;
}
</style>
