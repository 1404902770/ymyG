<template>
  <div>
    <!-- <h1>账号管理</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>企业用户</el-breadcrumb-item>
        <el-breadcrumb-item>企业列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="zhuce">
        <el-button
          type="primary"
          size="small"
          @click="gotozhuce"
        >
          <i class="el-icon-plus"></i>企业注册
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table
          :data="tableData"
          stripe
          :header-cell-style="headClass"
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            align="center"
            min-width="30"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="企业名称"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="企业证件号"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.zjhao }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="地址"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>
                {{
                scope.row.priv + '-' + scope.row.shi + '-' + scope.row.xian + '-' + scope.row.xiang
                }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="lianxiren"
            label="紧急联系人"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="lxtel"
            label="紧急联系人电话"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="beizhu"
            label="备注信息"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="操作"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <i
                class="el-icon-document-copy xiugai"
                title="修改企业信息"
                @click="updateqiye1(scope.$index, scope.row)"
              ></i>
              <i
                class="el-icon-user xiugai"
                title="修改联系人"
                @click="updatelxren(scope.$index, scope.row)"
              ></i>
              <i
                class="el-icon-delete xiugai"
                title="删除企业信息"
                @click="deleteeq(scope.$index, scope.row)"
              ></i>
              <!-- <i class="el-icon-document-copy" @click="updateqiye1(scope.$index, scope.row)"></i> -->
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"> -->
              <!-- </el-button> -->
              <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 企业注册 -->
    <div class="zhuce">
      <el-dialog
        :visible.sync="dialogFormVisible2"
        width="45%"
        @close="closezhuce"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="box">
            <div class="one">
              <el-form-item
                label="企业名称"
                prop="name"
              >
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item
                label="证件号码"
                prop="userid"
              >
                <el-input v-model="ruleForm.userid"></el-input>
              </el-form-item>
              <el-form-item
                label="联系电话"
                prop="call"
              >
                <el-input v-model.number="ruleForm.call"></el-input>
              </el-form-item>
            </div>
            <div class="two">
              <el-form-item
                label="紧急联系人"
                prop="user"
              >
                <el-input v-model="ruleForm.user"></el-input>
              </el-form-item>
              <el-form-item
                label="紧急电话"
                prop="alarmcall"
              >
                <el-input v-model.number="ruleForm.alarmcall"></el-input>
              </el-form-item>
            </div>
          </div>

          <!-- <el-form-item label="企业名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="证件号码" prop="userid">
            <el-input v-model="ruleForm.userid"></el-input>
          </el-form-item>-->

          <!-- <el-form-item label="电话" prop="call">
            <el-input v-model.number="ruleForm.call"></el-input>
          </el-form-item>-->

          <!-- <el-form-item label="紧急联系人" prop="user">
            <el-input v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item label="紧急电话" prop="alarmcall">
            <el-input v-model.number="ruleForm.alarmcall"></el-input>
          </el-form-item>-->

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

          <el-form-item
            label="详细地址"
            prop="address"
          >
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>

          <!-- 行业 -->
          <div class="selectHangye">
            <span class="newscover">选择行业</span>
            <el-select
              v-model="value1"
              placeholder="请选择"
              @change="a1"
            >
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>

            <el-select
              v-model="value2"
              placeholder="请选择"
              @change="a2"
              no-data-text="请先选择第一个"
              :disabled="value1 == '' ? true : false"
            >
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.text"
                :value="item.text"
                no-data-text="请先选择第一个"
              ></el-option>
            </el-select>

            <el-select
              v-model="value3"
              placeholder="请选择"
              @change="a3"
              no-data-text="请先选择第一个"
              :disabled="value2 == '' ? true : false"
            >
              <el-option
                v-for="item in options3"
                :key="item.id"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>

            <el-select
              :no-data-text="tiptext"
              v-model="value4"
              placeholder="请选择"
              :disabled="value3 == '' ? true : false"
              :clearable="true"
            >
              <el-option
                v-for="item in options4"
                :key="item.id"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </div>

          <el-form-item
            label="备注信息"
            prop="note"
          >
            <el-input
              type="textarea"
              v-model="ruleForm.note"
            ></el-input>
          </el-form-item>

          <el-form-item class="fun">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改企业列表 -->
    <div class="updateqiye">
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="closeupdate"
      >
        <el-form
          :model="updataqiyelist"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="企业名称"
            prop="name1"
          >
            <el-input v-model="updataqiyelist.name"></el-input>
          </el-form-item>
          <el-form-item
            label="证件号码"
            prop="zjhao"
          >
            <el-input v-model="updataqiyelist.zjhao"></el-input>
          </el-form-item>
          <!-- <el-form-item label="电话" prop="call">
            <el-input v-model.number="updataqiyelist.call"></el-input>
          </el-form-item>-->

          <!-- 省市区选择 -->
          <div class="region">
            <span class="newscover">选择地区</span>
            <v-distpicker
              :province="updataqiyelist.priv"
              :city="updataqiyelist.shi"
              :area="updataqiyelist.xian"
              @selected="onSelected"
            ></v-distpicker>
          </div>

          <el-form-item
            label="详细地址"
            prop="xiang"
          >
            <el-input v-model="updataqiyelist.xiang"></el-input>
          </el-form-item>

          <!-- 行业 -->
          <div class="selectHangye">
            <span class="newscover">选择行业</span>
            <el-select
              v-model="value1"
              placeholder="请选择"
              @click="b1"
              @change="a1"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>

            <el-select
              v-model="value2"
              placeholder="请选择"
              @click="b2"
              @change="a2"
              :no-data-text="tiptext"
              :disabled="value1 == '' ? true : false"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>

            <el-select
              v-model="value3"
              placeholder="请选择"
              @click="b3"
              @change="a3"
              :no-data-text="tiptext"
              :disabled="value2 == '' ? true : false"
            >
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>

            <el-select
              v-model="value4"
              placeholder="请选择"
              :disabled="value3 == '' ? true : false"
              :clearable="true"
              :no-data-text="tiptext"
            >
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </div>

          <el-form-item
            label="备注信息"
            prop="beizhu"
          >
            <el-input
              type="textarea"
              v-model="updataqiyelist.beizhu"
            ></el-input>
          </el-form-item>

          <el-form-item class="fun">
            <el-button
              type="primary"
              @click="submitForm1('ruleForm')"
            >提交</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改联系人列表 -->
    <div class="updatelxren">
      <el-dialog
        :visible.sync="dialogFormVisible3"
        width="25%"
      >
        <el-form
          :model="updataqiyelist"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="联系人名称"
            prop="lianxiren"
          >
            <el-input v-model="updatelxrenlist.lianxiren"></el-input>
          </el-form-item>
          <el-form-item
            label="联系人电话"
            prop="lxtel"
          >
            <el-input v-model="updatelxrenlist.lxtel"></el-input>
          </el-form-item>
          <el-form-item class="fun">
            <el-button
              type="primary"
              @click="submitForm2('ruleForm')"
            >修改</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 分页 -->
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
import VDistpicker from 'v-distpicker'
import http from '../../ajax/http'
import Vue from 'vue'
import { Alert } from 'element-ui'

export default {
  data() {
    return {
      // 修改行业
      updatehangye: [],

      // 行业信息
      options1: [],
      options2: [],
      options3: [],
      options4: [],

      // 行业信息无选项提示信息
      tiptext: '请重新选择第一个',

      value1: '',
      value2: '',
      value3: '',
      value4: '',

      gid: '',
      menlei: '',
      dalei: '',
      zhonglei: '',
      xiaolei: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 修改企业列表数据
      updataqiyelist: {},

      dialogFormVisible3: false,
      // 更新联系人
      updatelxrenlist: {},

      // 省市区信息
      temp: {
        address__province: '',
        address__city: '',
        address__dist: ''
      },

      // 输入信息
      ruleForm: {
        // 账户名称
        name: '',
        // 用户证件号
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
        region: '',
        // 账户权限
        type: [],
        // 账户
        resource: '',
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
        region: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ],
        // 账户权限
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个账户权限',
            trigger: 'change'
          }
        ],
        // 账户
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        // 行业分类
        sorts: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        // 备注信息
        note: [{ message: '请选择分类', trigger: 'blur' }]
      },

      dialogTableVisible2: false,
      dialogFormVisible2: false,
      // 表单数据
      tableData: [],
      // search: ''

      // 总条数
      total: '',
      // 每页条数
      pageSize: 15,
      // 当前页
      page: 1
    }
  },

  components: { VDistpicker },

  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 关闭修改弹框以后清空省市县选择
    closeupdate() {
      this.temp.address__province = ''
      this.temp.address__city = ''
      this.temp.address__dist = ''
    },

    // 编辑按钮
    handleEdit(index, row) {
      // console.log(index, row)
      // this.$router.push({ name: 'Account', params: row })
    },
    // 删除按钮
    handleDelete(index, row) {
      // console.log(index, row)
    },

    // 获取企业列表
    getfirmlist() {
      let num = '1'
      http
        .getlist({ page: this.page, limit: 13, type: 1, uid: localStorage.getItem('uid') })
        .then(res => {
          // console.log(res)

          this.tableData = res.data.data
          this.tableData.forEach(val => {
            val.num = num++
          })
          this.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点击注册
    gotozhuce() {
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.dialogFormVisible2 = true
    },
    // 选择省市区
    onSelected(data) {
      // console.log(data)
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__dist = data.area.value
    },

    // 选择第一个行业
    a1(aa) {
      // console.log(aa)
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].text == aa) {
          this.options2 = this.options1[i].children
        }
      }
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
    },
    // 选择第二个行业
    a2(aa) {
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].text == aa) {
          this.options3 = this.options2[i].children
        }
      }
      this.value3 = ''
      this.value4 = ''
    },
    // 选择第三个行业
    a3(aa) {
      for (let i = 0; i < this.options3.length; i++) {
        if (this.options3[i].text == aa) {
          this.options4 = this.options3[i].children
        }
      }
      this.value4 = ''

      if (!this.options4) {
        this.value4 = ''
        this.tiptext = '无'
      }
    },

    // // 选择第一个行业
    // a1(aa) {
    //   // console.log(aa)
    //   http.gethangye({ pid: aa }).then(res => {
    //     // console.log(res)
    //     this.options2 = res.data.data
    //   }).catch(err => {
    //     // console.log(err)
    //   })

    //   this.value2 = ''
    //   this.value3 = ''
    //   this.value4 = ''
    // },
    // // 选择第二个行业
    // a2(aa) {
    //   http.gethangye({ pid: aa }).then(res => {
    //     // console.log(res)
    //     this.options3 = res.data.data
    //   }).catch(err => {
    //     // console.log(err)
    //   })
    //   this.value3 = ''
    //   this.value4 = ''
    // },
    // // 选择第三个行业
    // a3(aa) {
    //   http.gethangye({ pid: aa }).then(res => {
    //     // console.log(res)
    //     this.options4 = res.data.data
    //   }).catch(err => {
    //     // console.log(err)
    //   })
    //   this.value4 = ''

    //   if (!this.options4) {
    //     this.value4 = ''
    //     this.tiptext = '无'
    //   }
    // },

    province(e) {
      // console.log(e)
    },

    // 获取行业信息
    gethangye() {
      http.gethangye().then(res => {
        // console.log(res)
        this.options1 = res.data.data
      }).catch(err => {
        // console.log(err)
      })
    },

    // 获取json文件的行业信息
    get() {
      var _this = this
      Vue.axios
        .get('hangye.json')
        .then(function (response) {
          // console.log(response)
          _this.options1 = response.data
          _this.updatehangye = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    // 提交注册企业方法
    send() {
      if (
        this.temp.address__province == '' ||
        this.temp.address__city == '' ||
        this.temp.address__dist == ''
      ) {
        this.$message({
          message: '请选择地区',
          type: 'warning'
        })
      } else {
        http
          .registered({
            uid: localStorage.getItem('uid'),
            name: this.ruleForm.name,
            zjhao: this.ruleForm.userid,
            priv: this.temp.address__province,
            shi: this.temp.address__city,
            xian: this.temp.address__dist,
            xiang: this.ruleForm.address,
            lianxiren: this.ruleForm.user,
            lxtel: this.ruleForm.alarmcall,
            beizhu: this.ruleForm.note,
            menlei: this.value1,
            dalei: this.value2,
            zhonglei: this.value3,
            xiaolei: this.value4
          })
          .then(res => {
            // console.log(res)
            this.$message({
              showClose: true,
              message: '企业注册成功',
              type: 'success'
            })

            this.dialogFormVisible2 = false

            this.temp.address__province = ''
            this.temp.address__city = ''
            this.temp.address__dist = ''
            this.value1 = ''
            this.value2 = ''
            this.value3 = ''
            this.value4 = ''
            this.$refs.ruleForm.resetFields()

            this.getfirmlist()
          })
          .catch(err => {
            this.$message.error('企业注册失败')
          })
      }
    },

    // 关闭注册弹框
    closezhuce() {
      this.options2 = ''
      this.options3 = ''
      this.options4 = ''
      this.temp.address__province = ''
      this.temp.address__city = ''
      this.temp.address__dist = ''
      this.$refs.ruleForm.resetFields()
    },

    // 数据处理
    dodata() { },

    // 点击修改企业
    updateqiye1(row, row2) {
      // console.log(row, row2)
      this.value1 = row2.menlei
      this.value2 = row2.dalei
      this.value3 = row2.zhonglei
      this.value4 = row2.xiaolei
      this.updataqiyelist = row2
      this.gid = row2.id

      this.temp.address__province = row2.priv
      this.temp.address__city = row2.shi
      this.temp.address__dist = row2.xian

      this.dialogFormVisible = true
      // console.log(this.options1)
      // if (this.value1 != '') {
      this.get()
      // }

      //   if (this.value2 != '') {
      //     this.a2()
      //   } else if (this.value3 != '') {
      //     this.a3()
      //   }
    },

    // 选择第一个行业
    b1(aa) {
      // console.log(aa)
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].text == aa) {
          this.options2 = this.options1[i].children
        }
      }
    },
    // 选择第二个行业
    b2(aa) {
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].text == aa) {
          this.options3 = this.options2[i].children
        }
      }
    },
    // 选择第三个行业
    b3(aa) {
      for (let i = 0; i < this.options3.length; i++) {
        if (this.options3[i].text == aa) {
          this.options4 = this.options3[i].children
        }
      }
    },

    // 修改企业接口
    updateQY() {
      http
        .updateqiye({
          uid: localStorage.getItem('uid'),
          gid: this.gid,
          name: this.updataqiyelist.name,
          zjhao: this.updataqiyelist.zjhao,
          menlei: this.value1,
          dalei: this.value2,
          zhonglei: this.value3,
          xiaolei: this.value4,
          priv: this.temp.address__province,
          shi: this.temp.address__city,
          xian: this.temp.address__dist,
          xiang: this.updataqiyelist.xiang,
          beizhu: this.updataqiyelist.beizhu
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 9) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getfirmlist()
          } else {
            this.$message({
              showClose: true,
              message: '请修改后提交',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点击修改企业联系人
    updatelxren(row, row2) {
      // console.log(row, row2)
      this.gid = row2.id
      this.updatelxrenlist = row2
      this.dialogFormVisible3 = true
    },
    // 修改企业联系人接口
    updateuser() {
      http
        .updateuser({
          uid: localStorage.getItem('uid'),
          gid: this.gid,
          lianxiren: this.updatelxrenlist.lianxiren,
          lxtel: this.updatelxrenlist.lxtel
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 11) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible3 = false
          } else {
            this.$message({
              message: '请修改后提交',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 提交按钮
    submitForm(formName) {
      // console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.value3 == '') {
            this.$message({
              message: '请选择行业',
              type: 'warning'
            })
          } else {
            this.send()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 修改企业信息提交按钮
    submitForm1() {
      this.updateQY()
    },
    // 修改企业联系人提交按钮
    submitForm2() {
      this.updateuser()
    },
    // 重置按钮
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.dialogFormVisible3 = false

      // this.temp.address__province = ''
      // this.temp.address__city = ''
      // this.temp.address__dist = ''
    },

    // 删除企业
    deleteeq(row, row2) {
      console.log(row, row2)
      console.log(row2.id)
    },

    // 分页改变
    tab(page) {
      this.page = page
      this.getfirmlist()
    }
  },
  mounted() {
    this.getfirmlist()
    this.get()
    this.a1()
    this.a2()
    this.a3()

    // this.gethangye()
  }
}
</script>
<style lang="less" scoped>
.el-table--border,
.el-table--group {
  border-left: none;
}

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
.el-breadcrumb {
  line-height: 32px;
}
.bread {
  margin: 12px 35px;
  display: flex;
  justify-content: space-between;
}

.block {
  margin-bottom: 22px;
  padding-left: 68px;
}
.demonstration {
  font-size: 14px;
  color: #606266;
  margin-left: -10px;
  margin-right: 14px;
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
.el-select {
  width: 170px;
}
.selectHangye {
  padding-left: 36px;
  margin-bottom: 20px;
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
  // position: relative;
  // bottom: 200px;
  // margin: 10% 0 0 50%;
  // left: 50%;
  // transform: translate(-50%, 0px);
  margin: 0 0 0 39rem;
  display: flex;
  span {
    font-size: 14px;
    color: #666;
  }
}

.el-table /deep/ td {
  padding: 13px 0 !important;
  font-size: 12px;
}

// .el-form-item /deep/ .el-form-item__content {
//   margin-left: 360px !important;
// }

.fun {
  text-align: right;
}

.el-dialog {
  margin-top: 12vh;
}

.box {
  display: flex;
}
.one,
.two {
  flex: 1;
}
.el-select {
  margin-right: 5px;
}
</style>
