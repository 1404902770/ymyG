<template>
  <div>
    <!-- <h1>账号管理</h1> -->
    <div class="topbox">
      <!-- <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设备管理</el-breadcrumb-item>
          <el-breadcrumb-item>设备列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>-->

      <!-- 顶部检索 -->
      <div class="leibei">
        <template>
          <el-select v-model="value" placeholder="请选择" @change="selectval">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>

        <el-input
          style="width:200px; margin-left: -66rem;"
          v-model="search"
          maxlength="12"
          placeholder="输入电箱号搜索"
        />

        <div class="zhuce">
          <el-button type="primary" size="small" @click="puteq">
            <i class="el-icon-plus"></i>设备入库
          </el-button>
        </div>
      </div>
    </div>

    <!-- :data="tableData.filter(data => !search || hexCharCodeToStr(data.mzid).toLowerCase().includes(search.toLowerCase()))" -->
    <!-- :data="tableData" -->
    <div class="mymain">
      <template>
        <el-table
          :data="tableData.filter(data => !search || hexCharCodeToStr(data.mzid).toLowerCase().includes(search.toLowerCase()))"
          stripe
          :header-cell-style="headClass"
          style="width: 100%"
        >
          <el-table-column label="产品迭代" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">
                {{
                scope.row.code == 1 ? '第一代' : '第二代'
                }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="模组编码" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">
                {{
                hexCharCodeToStr(scope.row.mozu)
                }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="电箱号" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">
                {{
                hexCharCodeToStr(scope.row.mzid)
                }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="分机个数" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.fen + '个' }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="安装地址" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.jianzhu }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="电箱名称" align="center" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.mzname }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="版本号" align="center" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">
                {{
                hexCharCodeToStr(scope.row.banben)
                }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="设备号" align="center" show-overflow-tooltip min-width="70">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.txfs }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="是否使能" align="center" show-overflow-tooltip min-width="80">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.neng == '01' ? '使能' : '不使能' }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" show-overflow-tooltip min-width="70">
            <!-- <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>-->
            <template slot-scope="scope">
              <!-- <i class="el-icon-document-copy xiugai" @click="edit(scope.$index, scope.row)"></i> -->
              <i class="el-icon-delete xiugai" @click="deleteeq(scope.$index, scope.row)"></i>

              <!-- <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteeq(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </template>
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

    <!-- 设备入库 -->
    <div class="zhuce">
      <el-dialog title="设备入库" :visible.sync="dialogFormVisible2" width="38%" @close="closeputeq">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="box">
            <div class="one">
              <el-form-item label="设备号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>

              <el-form-item label="产品版本" prop="code">
                <el-select v-model="ruleForm.code" placeholder="请选择产品代码">
                  <template v-for="(item, index) in code">
                    <el-option :label="item.name" :value="item.id" :key="index"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="设备规格" prop="guige">
                <el-select v-model="ruleForm.guige" placeholder="请选择活动区域">
                  <el-option label="20A" value="20"></el-option>
                  <el-option label="32A" value="32"></el-option>
                  <el-option label="40A" value="40"></el-option>
                  <el-option label="63A" value="63"></el-option>
                  <el-option label="80A" value="80"></el-option>
                  <el-option label="100A" value="100"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="two">
              <el-form-item label="是否漏电" prop="loudian">
                <el-select v-model="ruleForm.loudian" placeholder="请选择活动区域">
                  <el-option label="带漏电" value="1"></el-option>
                  <el-option label="不带漏电" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="设备型号" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择设备型号">
                  <template v-for="(item, index) in region">
                    <el-option :label="item.name" :value="item.name" :key="index"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="设备极数" prop="jishu">
                <el-select v-model="ruleForm.jishu" placeholder="请选择极数">
                  <template v-for="(item, index) in jishu">
                    <el-option :label="item.name" :value="item.id" :key="index"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <!-- <el-form-item label="设备号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="产品版本" prop="code">
            <el-select v-model="ruleForm.code" placeholder="请选择产品代码">
              <template v-for="(item, index) in code">
                <el-option :label="item.name" :value="item.id" :key="index"></el-option>
              </template>
            </el-select>
          </el-form-item>

          <el-form-item label="是否带漏电" prop="loudian">
            <el-select v-model="ruleForm.loudian" placeholder="请选择活动区域">
              <el-option label="带漏电" value="1"></el-option>
              <el-option label="不带漏电" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="设备型号" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择设备型号">
              <template v-for="(item, index) in region">
                <el-option :label="item.name" :value="item.name" :key="index"></el-option>
              </template>
            </el-select>
          </el-form-item>-->

          <!-- <div class="three">
            <el-form-item label="设备规格" prop="guige">
              <el-select v-model="ruleForm.guige" placeholder="请选择活动区域">
                <el-option label="20A" value="20"></el-option>
                <el-option label="32A" value="32"></el-option>
                <el-option label="40A" value="40"></el-option>
                <el-option label="63A" value="63"></el-option>
                <el-option label="80A" value="80"></el-option>
                <el-option label="100A" value="100"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="设备极数" prop="jishu">
              <el-select v-model="ruleForm.jishu" placeholder="请选择极数">
                <template v-for="(item, index) in jishu">
                  <el-option :label="item.name" :value="item.id" :key="index"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </div>-->

          <!-- <el-form-item label="规格" prop="guige">
            <el-select v-model="ruleForm.guige" placeholder="请选择活动区域">
              <el-option label="20A" value="20"></el-option>
              <el-option label="32A" value="32"></el-option>
              <el-option label="40A" value="40"></el-option>
              <el-option label="63A" value="63"></el-option>
              <el-option label="80A" value="80"></el-option>
              <el-option label="100A" value="100"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="极数" prop="jishu">
            <el-select v-model="ruleForm.jishu" placeholder="请选择极数">
              <template v-for="(item, index) in jishu">
                <el-option :label="item.name" :value="item.id" :key="index"></el-option>
              </template>
            </el-select>
          </el-form-item>-->

          <el-form-item class="fun">
            <el-button type="primary" @click="submitForm('ruleForm')">立即入库</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import http from '../../ajax/http'

export default {
  data() {
    return {
      dialogTableVisible2: false,
      dialogFormVisible2: false,

      //产品代码
      code: [
        {
          id: 1,
          name: '第一代'
        },
        {
          id: 2,
          name: '第二代'
        }
      ],

      // 设备型号
      region: [
        {
          id: 1,
          name: 'ZJSBL9-100'
        },
        {
          id: 1,
          name: 'YMYB1-100'
        }
      ],
      // 极数
      jishu: [
        {
          id: 1,
          name: '1P'
        },
        {
          id: 2,
          name: '2P'
        },
        {
          id: 3,
          name: '3P'
        },
        {
          id: 4,
          name: '4P'
        }
      ],

      ruleForm: {
        code: '',
        // 设备名称
        name: '',
        // 设备类型
        region: '',
        // 规格
        guige: '',
        // 极数
        jishu: '',
        loudian: ''
      },
      rules: {
        // 设备名称规则
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 设备型号
        region: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ],
        // 规格规则
        guige: [{ required: true, message: '请输入设备规格', trigger: 'blur' }],
        // 极数规则
        jishu: [
          { required: true, message: '请输入设备极数', trigger: 'change' }
        ],
        // 账户权限
        code: [
          { required: true, message: '请选择产品代码', trigger: 'change' }
        ],
        // 漏电
        loudian: [
          { required: true, message: '请选择产品代码', trigger: 'change' }
        ]
      },

      search: '',

      // 总条数
      total: '',
      // 每页条数
      pageSize: 13,
      // 当前页
      page: '1',

      // 选择类别
      options: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '已入总库'
        },
        {
          value: 3,
          label: '总库出库'
        },
        {
          value: 5,
          label: '地方仓库'
        },
        {
          value: 7,
          label: '已入客户仓库'
        },
        {
          value: 9,
          label: '故障设备'
        },
        {
          value: 11,
          label: '正常运行'
        },
        {
          value: 12,
          label: '被删除'
        }
      ],
      value: '全部',

      // 表单数据
      tableData: []
    }
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },
    // 设备入库
    putEq() {
      http
        .puteq({
          code: this.ruleForm.code,
          nid: this.ruleForm.name.toUpperCase(),
          xinghao: this.ruleForm.region,
          guige: this.ruleForm.guige,
          jishu: this.ruleForm.jishu,
          uid: localStorage.getItem('uid'),
          lou: Number(this.ruleForm.loudian)
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 40) {
            this.$message({
              showClose: true,
              message: '设备入库成功',
              type: 'success'
            })

            // this.ruleForm.code = ''
            // this.ruleForm.name = ''
            // this.ruleForm.region = ''
            // this.ruleForm.guige = ''
            // this.ruleForm.jishu = ''
            // this.ruleForm.loudian = ''

            this.dialogFormVisible2 = false
            this.$refs.ruleForm.resetFields()

            this.geteqlist()
            this.resetForm()
          } else {
            this.$message({
              showClose: true,
              message: '设备已入库',
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
      var _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          _this.putEq()
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

    // 检索设备选择
    selectval() {
      this.geteqlist()
    },
    // 编辑按钮
    // edit(index, row) {
    //   console.log(index, row)
    // },

    // 删除按钮
    deleteeq(index, row) {
      // console.log(index, row)
      let nid = row.mzid

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          http
            .deleteeq({ nid, uid: localStorage.getItem('uid') })
            .then(res => {
              // console.log(res)
              if (res.data.code == 15) {
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
                this.geteqlist()
              } else {
                this.$message.error('删除失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 获取设备列表
    geteqlist() {
      http
        .geteqlist({ bz: this.value, page: this.page - 1 })
        .then(res => {
          // console.log(res)
          this.tableData = res.data.data
          this.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分页改变
    tab(page) {
      this.page = page
      this.geteqlist()
    },

    // 点击设备入库
    puteq() {
      this.dialogFormVisible2 = true
    },

    // 关闭设备入库弹框
    closeputeq() {
      this.$refs.ruleForm.resetFields()

      this.ruleForm.code = ''
      this.ruleForm.name = ''
      this.ruleForm.region = ''
      this.ruleForm.guige = ''
      this.ruleForm.jishu = ''
      this.ruleForm.loudian = ''
    }
  },
  mounted() {
    this.geteqlist()
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  border: none;
  padding: 0;
  background-color: transparent;
  color: #333;
}
// .zhuce {
//   position: absolute;
//   right: 90px;
//   top: 119px;
// }
.bread {
  margin: 20px 0 20px 35px;
}
.page {
  // position: absolute;
  // bottom: 20px;
  // left: 50%;
  // transform: translate(-50%, 0px);
  margin: 0 0 0 39rem;
  display: flex;
  span {
    font-size: 14px;

    color: #666;
  }
}
.mymain {
  height: 48.5rem;
}

.fun {
  // margin-left: 166px;
  text-align: end;
  margin-right: 57px;
  margin-top: 26px;
}
.leibei {
  margin: 12px 35px;
  // margin-bottom: 20px;
  // margin-left: 35px;
  // margin-right: 35px;
  display: flex;
  justify-content: space-between;
}
.el-button--small {
  margin-top: 4px;
}

.xiugai {
  padding: 5px;
  cursor: pointer;
}
.xiugai:hover {
  color: teal;
}

.el-table /deep/ td {
  padding: 10px 0 !important;
}

.box {
  display: flex;
}
// .one,
// .two,
// .three {
//   float: left;
// }

// .three {
//   display: flex;
// }
</style>
