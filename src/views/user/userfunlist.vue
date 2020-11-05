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
        <el-button
          type="primary"
          size="small"
          @click="gotozhuce"
        >
          <i class="el-icon-plus"></i>注册账号
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table
          :data="tableData"
          :header-cell-style="headClass"
          stripe
          style="width: 100%"
        >
          <el-table-column
            label="用户名称"
            align="center"
            show-overflow-tooltip
            min-width="100"
          >
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="用户账号"
            align="center"
            show-overflow-tooltip
            min-width="100"
          >
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.zjhao }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="联系电话"
            align="center"
            show-overflow-tooltip
            min-width="100"
          >
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.call }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="地区"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-tag size="medium">
                {{
                scope.row.priv + '-' + scope.row.shi + '-' + scope.row.xian
                }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="详细地址"
            align="center"
            show-overflow-tooltip
            min-width="100"
          >
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.xiang }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="紧急联系人"
            align="center"
            show-overflow-tooltip
            min-width="100"
          >
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.lianxiren }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="紧急联系人电话"
            align="center"
            show-overflow-tooltip
            min-width="100"
          >
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.lxtel }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="备注信息"
            align="center"
            show-overflow-tooltip
            min-width="100"
          >
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.beizhu }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <i
                class="el-icon-edit xiugai"
                title="修改信息"
                @click="handleEdit(scope.$index, scope.row)"
              ></i>

              <i
                class="el-icon-connection xiugai"
                title="绑定设备"
                @click="bindeq(scope.$index, scope.row)"
              ></i>

              <i
                class="el-icon-view xiugai"
                title="查看绑定设备"
                @click="getbandeq(scope.$index, scope.row)"
              ></i>

              <i
                class="el-icon-delete xiugai"
                title="删除账号"
                @click="handleDelete(scope.$index, scope.row)"
              ></i>

              <!-- <el-button type="text" size="mini" @click="bindeq(scope.$index, scope.row)">绑定设备</el-button>
              <el-button type="text" @click="getbandeq(scope.$index, scope.row)">查看</el-button>-->

              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 个人注册 -->
    <div class="zhuce">
      <el-dialog
        :visible.sync="dialogFormVisible"
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
                label="用户名称"
                prop="name"
              >
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item
                label="用户账号"
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
            >
              {{
              subtext
              }}
            </el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 设备绑定 -->
    <div class="bindbox">
      <el-dialog
        title="设备绑定"
        :visible.sync="dialogFormVisible2"
        width="60%"
        @close="closed1"
      >
        <el-form :model="form">
          <el-form-item
            label="带漏电"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.lou"
              placeholder="请选择活动区域"
              @change="geteqtype"
            >
              <el-option
                label="带漏电"
                value="1"
              ></el-option>
              <el-option
                label="不带漏电"
                value="2"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="型号"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.xinghao"
              placeholder="请选择活动区域"
              @change="geteqtype"
              :disabled="form.lou == '' ? true : false"
            >
              <el-option
                label="20A"
                value="20"
              ></el-option>
              <el-option
                label="32A"
                value="32"
              ></el-option>
              <el-option
                label="40A"
                value="40"
              ></el-option>
              <el-option
                label="63A"
                value="63"
              ></el-option>
              <el-option
                label="80A"
                value="80"
              ></el-option>
              <el-option
                label="100A"
                value="100"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="极数"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.jishu"
              placeholder="请选择活动区域"
              @change="geteqtype"
              :disabled="form.xinghao == '' ? true : false"
            >
              <el-option
                label="1P"
                value="1"
              ></el-option>
              <el-option
                label="2P"
                value="2"
              ></el-option>
              <el-option
                label="3P"
                value="3"
              ></el-option>
              <el-option
                label="4P"
                value="4"
              ></el-option>
            </el-select>
          </el-form-item>

          <div class="bangding">
            <template>
              <el-table
                :data="tablebang"
                style="width: 100%"
                empty-text="暂无设备"
              >
                <el-table-column
                  label="设备号"
                  align="center"
                  min-width="180"
                >
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">
                      {{
                      hexCharCodeToStr(scope.row.mzid)
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="型号"
                  align="center"
                  min-width="180"
                >
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
                    <span style="margin-left: 10px">{{ scope.row.guige }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="规格"
                  align="center"
                  min-width="90"
                >
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">
                      {{
                      scope.row.guige + 'A'
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="极数"
                  align="center"
                  min-width="90"
                >
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">
                      {{
                      scope.row.jishu + 'P'
                      }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="操作"
                  align="center"
                  min-width="160"
                >
                  <template slot-scope="scope">
                    <!-- <el-button size="mini" @click="handlebang(scope.$index, scope.row)">编辑</el-button> -->
                    <el-button
                      size="mini"
                      @click="bangidng(scope.$index, scope.row)"
                    >绑定</el-button>
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

    <!-- 查看弹框 -->
    <div class="getbind">
      <el-dialog
        :visible.sync="dialogFormVisible3"
        width="95%"
        @close="closelookbind"
      >
        <div class="look">
          <template>
            <el-table
              :data="bangeqlist"
              style="width: 100%"
              empty-text="暂无设备"
            >
              <el-table-column
                label=" 版本"
                align="center"
                min-width="90"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.code == '1' ? '第一代' : '第二代'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="模组"
                align="center"
                min-width="180"
              >
                <template slot-scope="scope">
                  <span>{{ hexCharCodeToStr(scope.row.mozu) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="模组ID"
                align="center"
                min-width="180"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    hexCharCodeToStr(scope.row.mzid)
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="漏电"
                align="center"
                min-width="90"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.lou == 1 ? '带漏电' : '不带漏电'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label=" 型号"
                align="center"
                min-width="90"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.xinghao }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="规格"
                align="center"
                min-width="90"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.guige + 'A'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="极数"
                align="center"
                min-width="90"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    scope.row.jishu + 'P'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="地址"
                align="center"
                min-width="130"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.jianzhu }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="部门"
                align="center"
                min-width="130"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.mzname }}</span>
                </template>
              </el-table-column>
              <!-- 当前步骤：1入库，2保留，3出库，4保留，5地方仓库，6保留，7客户仓库，8保留，9故障，10保留，11正常运行中，12被删除 -->
              <el-table-column
                label="状态"
                align="center"
                min-width="90"
              >
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
              <el-table-column
                label="时间"
                align="center"
                min-width="90"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{
                    new Date(scope.row.jihuo * 1000).Format('yy-MM-dd ')
                    }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- <el-button size="mini" @click="handlebang(scope.$index, scope.row)">编辑</el-button> -->
                  <!-- <el-button size="mini" @click="bangidng(scope.$index, scope.row)">绑定</el-button> -->
                  <el-button
                    size="mini"
                    type="danger"
                    @click="unband(scope.$index, scope.row)"
                  >解除绑定</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-dialog>
    </div>

    <!-- 分页 -->
    <div
      v-if="total != ''"
      class="page"
    >
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
import $ from 'jquery'

export default {
  data() {
    return {
      // 表单数据
      tableData: [
        {
          id: '1',
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
        },
        {
          id: '2',
          name: '白浩',
          zjhao: '666',
          priv: '河北省',
          shi: '秦皇岛市',
          xian: '抚宁区',
          lianxiren: '筱风',
          call: '123456',
          xiang: '北商业街65号',
          lxtel: '123546',
          beizhu: '暂无'
        }
      ],

      // 查看绑定设备数据
      bangeqlist: [],

      // 设备绑定检索数据
      form: {
        lou: '',
        jishu: '',
        xinghao: ''
      },
      formLabelWidth: '72px',
      // 绑定表格
      tablebang: [],
      // 用户id
      uid: '',
      // 绑定设备返回状态
      code: '',

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
      // 注册个人账号弹框
      dialogFormVisible: false,
      // 设备绑定弹框
      dialogFormVisible2: false,
      // 查看绑定设备弹框
      dialogFormVisible3: false
    }
  },

  components: { VDistpicker },

  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 关闭设备绑定弹框刷新界面
    closed1() {
      this.form.lou = ''
      this.form.jishu = ''
      this.form.xinghao = ''
      this.tablebang = []
      //   this.$router.go(0)
    },
    // 关闭查看绑定设备弹框
    closelookbind() {
      // console.log('123')
      this.bangeqlist = []
    },

    // 关闭注册
    closezhuce() {
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
        .getlist({ page: this.page, limit: 13, type: 2, uid: localStorage.getItem('uid') })
        .then(res => {
          // console.log(res)
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

    // 点击注册按钮
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

    // 点击绑定设备按钮
    bindeq(index, row) {
      this.dialogFormVisible2 = true
      this.uid = this.tableData[index].id
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
    // 检所完成点击绑定按钮和接口
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
    // 点击解除绑定按钮和接口
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
            }
          }, 0)
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 提交按钮
    submitForm(formName) {
      console.log(this.ruleForm, this.temp)

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
            this.dialogFormVisible = false
          } else {
            console.log('修改成功')
            this.dialogFormVisible = false
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
.bindbox {
  .el-form:nth-of-type(1) {
    display: flex;
    flex-wrap: wrap;
  }
}
.bangding {
  width: 100%;
}

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

.mymain {
  .el-table /deep/ td {
    padding: 9px 0 !important;
  }
}

.el-dialog__wrapper {
  z-index: 1999 !important;
}
</style>
