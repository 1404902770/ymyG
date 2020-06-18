<template>
  <div>
    <!-- <h1>账号管理</h1> -->
    <div class="topbox">
      <!-- 顶部检索 -->
      <div class="leibei">
        <el-form ref="form" :model="form" class="demo-ruleForm clearfix" label-width="100px">
          <el-form-item label="选择用户" prop="user">
            <el-select v-model="form.user" filterable placeholder="全部" @change="getOptions">
              <el-option
                v-for="(item,index) in useroptions"
                :label="item.name"
                :value="item.uid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电箱设备号" prop="region">
            <el-select
              :disabled="form.user==''?true:false"
              v-model="form.region"
              filterable
              clearable
              placeholder="全部"
              @change="getfenlu"
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+ hexCharCodeToStr(item.mzid) +']' + item.mzname"
                :value="item.mzid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择分路" prop="fenlu1">
            <el-select
              :disabled="form.region==''?true:false"
              v-model="form.fenlu1"
              no-data-text="暂无分路"
              filterable
              clearable
              placeholder="全部"
              @change="getinfo"
            >
              <el-option
                v-for="(item1,index) in fenlu"
                :label="'(线路'+item1.mid+')'+item1.name"
                :value="item1.mid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="处理查询" prop="pu">
            <el-select v-model="form.pu" placeholder="全部" @change="getinfo" clearable>
              <el-option label="欠压告警" value="1"></el-option>
              <el-option label="过压预警" value="2"></el-option>
              <el-option label="过压报警" value="3"></el-option>
              <el-option label="电流预警" value="4"></el-option>
              <el-option label="电流告警" value="5"></el-option>
              <el-option label="电流报警" value="6"></el-option>
              <el-option label="漏电流报警" value="7"></el-option>
              <el-option label="温度报警" value="8"></el-option>
              <el-option label="分机报警" value="9"></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="选择日期"> -->
          <el-date-picker
            style="margin-left:15px"
            v-model="value2"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            @change="getinfo"
          ></el-date-picker>
          <!-- </el-form-item> -->
        </el-form>
      </div>
      <div class="btn">
        <el-button
          :disabled="form.region==''?true:false"
          style="margin-left:15px"
          type="primary"
          @click="deleteinfo"
        >删除主机报警</el-button>
        <el-button
          :disabled="form.fenlu1==''?true:false"
          style="margin-left:15px"
          type="primary"
          @click="deletefenlu"
        >删除线路报警</el-button>
        <el-button
          :disabled="form.region || form.fenlu1 !=''?true:false"
          style="margin-left:15px"
          type="primary"
          @click="deleteall"
        >全部删除</el-button>
      </div>
    </div>

    <!-- :data="tableData.filter(data => !search || hexCharCodeToStr(data.mzid).toLowerCase().includes(search.toLowerCase()))" -->
    <!-- :data="tableData" -->
    <div class="mymain">
      <template>
        <el-table :header-cell-style="headClass" :data="tableData" stripe style="width: 100%">
          <el-table-column
            prop="nid"
            show-overflow-tooltip
            label="电箱号"
            align="center"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="mzname"
            show-overflow-tooltip
            label="电箱名字"
            align="center"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="jianzhu"
            show-overflow-tooltip
            label="电箱地址"
            align="center"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="线路名字"
            align="center"
            min-width="80"
          ></el-table-column>
          <el-table-column prop="aa" show-overflow-tooltip label="线路" align="center" min-width="60"></el-table-column>
          <el-table-column
            prop="local"
            show-overflow-tooltip
            label="线路地址"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="otype"
            show-overflow-tooltip
            label="告警类型"
            align="center"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="limit"
            show-overflow-tooltip
            label="报警级别"
            align="center"
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="status"
            show-overflow-tooltip
            label="报警状态"
            align="center"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="beizhu"
            show-overflow-tooltip
            label="报警详情"
            align="center"
            min-width="80"
          ></el-table-column>
          <!-- <el-table-column prop="xname" show-overflow-tooltip label="检修人" align="center" min-width="60"></el-table-column>
          <el-table-column prop="xtime" show-overflow-tooltip label="检修时间" align="center" min-width="80"></el-table-column>-->
          <el-table-column
            prop="time"
            show-overflow-tooltip
            label="报警发生时间"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column label="操作" align="center" show-overflow-tooltip min-width="70">
            <template slot-scope="scope">
              <i class="el-icon-delete xiugai" @click="deleteeq(scope.$index, scope.row)"></i>
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
  </div>
</template>
<script>
import http from '../../ajax/http'

export default {
  data() {
    return {
      // search: '',

      // 检索
      form: {
        user: '',
        region: '',
        pu: '',
        fenlu1: ''
      },

      // 分路
      fenlu: [],

      value2: '',

      // 总条数
      total: '',
      // 每页条数
      pageSize: 13,
      // 当前页
      page: '1',

      // 选择类别
      options: [],
      // 选择用户
      useroptions: [],
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

    // 检索设备选择
    selectval() {
      this.getalarminfo()
    },

    // 表格删除按钮
    deleteeq(index, row) {
      console.log(index, row)
      let id = row.id

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          http
            .deleteonealarm({
              uid: localStorage.getItem('uid'),
              id: Number(id)
            })
            .then(res => {
              if (res.data.code == 27) {
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
                this.getalarminfo()
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

    // 获取全部企业
    getallcompany() {
      http
        .getallcompany({ uid: localStorage.getItem('uid') })
        .then(res => {
          this.useroptions = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 获取报警信息
    getalarminfo() {
      http
        .getalarminfo({
          uid: this.form.user,
          page: this.page - 1,
          type: this.form.pu ? Number(this.form.pu) : 0,
          nid: this.form.region ? this.form.region : 0,
          mid: this.form.fenlu1 ? this.form.fenlu1 : 0
        })
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.total[0].total
          for (let i = 0; i < this.tableData.length; i++) {
            // 电箱号
            this.tableData[i].nid = this.hexCharCodeToStr(this.tableData[i].nid)
            // 线路
            this.tableData[i].aa = '线路' + this.tableData[i].aa
            // 告警类型
            if (this.tableData[i].otype == 1) {
              this.tableData[i].otype = '欠压告警'
            } else if (this.tableData[i].otype == 2) {
              this.tableData[i].otype = '过压预警'
            } else if (this.tableData[i].otype == 3) {
              this.tableData[i].otype = '过压报警'
            } else if (this.tableData[i].otype == 4) {
              this.tableData[i].otype = '电流预警'
            } else if (this.tableData[i].otype == 5) {
              this.tableData[i].otype = '电流告警'
            } else if (this.tableData[i].otype == 6) {
              this.tableData[i].otype = '电流报警'
            } else if (this.tableData[i].otype == 7) {
              this.tableData[i].otype = '漏电流报警'
            } else if (this.tableData[i].otype == 8) {
              this.tableData[i].otype = '温度报警'
            } else if (this.tableData[i].otype == 9) {
              this.tableData[i].otype = '分机报警'
            } else {
              this.tableData[i].otype = '- -'
            }
            // 报警级别
            this.tableData[i].limit = '建议断闸检修'
            // 报警状态
            if (this.tableData[i].status == 0) {
              this.tableData[i].status = '未读'
            } else if (this.tableData[i].status == 1) {
              this.tableData[i].status = '只阅读'
            } else if (this.tableData[i].status == 2) {
              this.tableData[i].status = '已经检修'
            } else if (this.tableData[i].status == 3) {
              this.tableData[i].status = '已删除'
            } else {
              this.tableData[i].otype = '- -'
            }
            // 检修人
            this.tableData[i].xname = this.tableData[i].xname
              ? this.tableData[i].xname
              : '- -'
            this.tableData[i].xtime = this.tableData[i].xtime
              ? this.tableData[i].xtime
              : '- -'
            // 报警发生的时间
            this.tableData[i].time = new Date(
              this.tableData[i].time * 1000
            ).Format('yy-MM-dd hh:mm:ss')
          }
        })
    },

    // 删除一台主机的报警信息
    deleteonezhuji() {
      let a = new Date(this.value2[0])
      let b = new Date(this.value2[1])
      let start = a.getTime() / 1000
      let end = b.getTime() / 1000 + 86399

      if (this.value2 == '') {
        http
          .deleteonezhuji({
            uid: localStorage.getItem('uid'),
            nid: this.form.region,
            type: 0,
            start: 0,
            end: 0
          })
          .then(res => {
            if (res.data.code == 46) {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.getalarminfo()
            } else {
              this.$message.error('删除失败')
            }
          })
      } else {
        http
          .deleteonezhuji({
            uid: localStorage.getItem('uid'),
            nid: this.form.region,
            type: 1,
            start: start,
            end: end
          })
          .then(res => {
            if (res.data.code == 46) {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.getalarminfo()
            } else {
              this.$message.error('删除失败')
            }
          })
      }
    },

    // 删除全部
    deleteall() {
      let a = new Date(this.value2[0])
      let b = new Date(this.value2[1])
      let start = a.getTime() / 1000
      let end = b.getTime() / 1000 + 86399

      if (this.value2 == '') {
        http
          .deleteuseralam({ uid: localStorage, type: 0, start: 0, end: 0 })
          .then(res => {
            if (res.data.code == 51) {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.getalarminfo()
            } else {
              this.$message.error('删除失败')
            }
          })
      } else {
        http
          .deleteonezhuji({
            uid: this.form.user,
            type: 1,
            start: start,
            end: end
          })
          .then(res => {
            if (res.data.code == 51) {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.getalarminfo()
            } else {
              this.$message.error('删除失败')
            }
          })
      }
    },

    // 删除一台主机的报警信息
    deleteinfo() {
      this.deleteonezhuji()
    },

    // 删除一条线路的报警信息
    deletefenlu() {
      console.log('123')
      let a = new Date(this.value2[0])
      let b = new Date(this.value2[1])
      let start = a.getTime() / 1000
      let end = b.getTime() / 1000 + 86399

      if (this.value2 == '') {
        http
          .deleteonexianlu({
            uid: localStorage.getItem('uid'),
            nid: this.form.region,
            mid: this.form.fenlu1,
            type: 0,
            start: 0,
            end: 0
          })
          .then(res => {
            console.log(res)
            if (res.data.code == 48) {
              this.$message({
                showClose: true,
                message: '恭喜你，这是一条成功消息',
                type: 'success'
              })
              this.getalarminfo()
            }
          })
      } else {
        http
          .deleteonexianlu({
            uid: localStorage.getItem('uid'),
            nid: this.form.region,
            mid: this.form.fenlu1,
            type: 1,
            start: start,
            end: end
          })
          .then(res => {
            console.log(res)
            if (res.data.code == 48) {
              this.$message({
                showClose: true,
                message: '恭喜你，这是一条成功消息',
                type: 'success'
              })
              this.getalarminfo()
            }
          })
      }
    },

    // 初始化获取下拉数据 - 所有设备
    getOptions() {
      this.form.region = ''
      http.getOptions({ uid: this.form.user }).then(res => {
        // console.log(res)
        this.options = res.data.data
      })
      this.getalarminfo()
    },

    // 获取分路
    getfenlu(val) {
      http.getfenlu({ nid: val }).then(res => {
        this.fenlu = res.data.data
      })
      this.getalarminfo()
    },

    getinfo() {
      this.getalarminfo()
    },

    // 分页改变
    tab(page) {
      this.page = page
      this.getalarminfo()
    }
  },
  mounted() {
    // this.getalarminfo()
    this.getallcompany()
    // this.getOptions()
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
  height: 43rem;
}

.fun {
  text-align: end;
  margin-right: 57px;
  margin-top: 26px;
}
.leibei {
  margin-top: 12px;
  .el-form-item,
  .el-button {
    float: left;
  }
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
  font-size: 12px;
}

.box {
  display: flex;
}

.btn {
  text-align: right;
  margin-right: 60px;
}
.el-select /deep/ .el-input--suffix .el-input__inner {
  height: 35px;
}

// 清浮动
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
</style>
