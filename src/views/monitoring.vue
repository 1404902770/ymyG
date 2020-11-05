<template>
  <!-- <h1>监控</h1> -->
  <div
    class="monitoring"
    v-loading="is"
    element-loading-text="正在加载请稍后"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <el-row class="top">
      <el-col :span="8">
        <ul class="ulLeft">
        </ul>
      </el-col>
      <el-col :span="8">
        <h2>设备监控平台</h2>
      </el-col>
      <el-col :span="8">
        <ul class="ulRight">
          <!-- <li
            class="t1"
            @click="path1"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="点击退出到登录"
              placement="bottom"
            >
              <img
                style="width: 26px;margin-top: -10px;"
                src="../../public/static/images/outT.png"
                alt
              />
            </el-tooltip>
            <p class="hometext">退出</p>
          </li> -->
          <li
            class="t1"
            @click="path2"
          >
            <img
              style="width: 26px;margin-top: -10px;"
              src="../../public/static/images/zhuye.png"
              alt=""
            >
            <p class="hometext">主页</p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <div class="tabheader">
      <!-- <div
        class="tab"
        @click="geteq"
      >总设备</div> -->
      <div class="tab">总设备 : {{total+"台"}}</div>
      <div
        class="tab active"
        @click="getoutline"
      >离线主机 : {{offline+"台"}}</div>
      <div
        class="tab"
        @click="getalarm"
      >报警信息{{ tableDataalarm.length != 0 ? " : " + tableDataalarm.length+"条" : ""}}</div>

    </div>

    <div class="content">
      <div
        class="eq"
        v-show='tag==0'
      ></div>

      <div
        class="outlinebox"
        v-show='tag==1'
      >
        <el-table
          :data="tableData"
          height="100%"
          :header-cell-style="{color:'#fff'}"
          style="width: 100%;color:white"
        >
          <el-table-column
            prop="code"
            show-overflow-tooltip
            label="产品迭代"
            align="center"
            min-width="60"
          ></el-table-column>

          <el-table-column
            prop="mozu"
            show-overflow-tooltip
            label="模组名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="mzid"
            show-overflow-tooltip
            label="电箱名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="mzname"
            show-overflow-tooltip
            label="电箱名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <!-- <el-table-column
            label="电箱号"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.mzid) }}</span>
            </template>
          </el-table-column> -->

          <el-table-column
            prop="fen"
            show-overflow-tooltip
            label="分机个数"
            align="center"
            min-width="60"
          ></el-table-column>

          <el-table-column
            prop="guige"
            show-overflow-tooltip
            label="规格"
            align="center"
            min-width="60"
          ></el-table-column>

          <!-- <el-table-column
            prop="bz"
            show-overflow-tooltip
            label="当前状态"
            align="center"
            min-width="100"
          ></el-table-column> -->

          <el-table-column
            prop="xinghao"
            show-overflow-tooltip
            label="型号"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="lou"
            show-overflow-tooltip
            label="是否漏电"
            align="center"
            min-width="60"
          ></el-table-column>

          <el-table-column
            prop="phone"
            show-overflow-tooltip
            label="联系方式"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="nick"
            show-overflow-tooltip
            label="账号昵称"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="final_time"
            show-overflow-tooltip
            label="最后在线时间"
            align="center"
            min-width="100"
          ></el-table-column>

        </el-table>
      </div>

      <div
        class="alarminfo"
        v-show='tag==2'
      >
        <el-table
          :data="tableDataalarm"
          height="100%"
          :header-cell-style="{color:'#fff'}"
          style="width: 100%;color:white"
        >

          <el-table-column
            label="电箱号"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.nid) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="mzname"
            show-overflow-tooltip
            label="电箱名称"
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
            label="线路名称"
            align="center"
            min-width="80"
          ></el-table-column>

          <el-table-column
            prop="aa"
            show-overflow-tooltip
            label="线路"
            align="center"
            min-width="30"
          ></el-table-column>

          <el-table-column
            prop="local"
            show-overflow-tooltip
            label="线路地址"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="beizhu"
            show-overflow-tooltip
            label="报警详情"
            align="center"
            min-width="160"
          ></el-table-column>

          <el-table-column
            prop="time"
            show-overflow-tooltip
            label="报警发生时间"
            align="center"
            min-width="100"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../ajax/http'
import $ from 'jquery'

export default {
  data() {
    return {
      is: true,
      // 离线设备
      tableData: [],

      // 报警信息
      tableDataalarm: [],

      // 离线主机数
      offline: "",
      //   主机总数
      total: "",

      // 状态
      tag: 0,

      // 定时器
      timer: ""
    }
  },
  methods: {
    geteq(e) {
      this.tag = 0
      if (e) {
        e.path[1].children[1].style.backgroundColor = 'transparent'
        e.path[1].children[2].style.backgroundColor = 'transparent'
        e.path[0].style.backgroundColor = 'teal'
      }
    },

    // 获取离线主机
    getoutline(e) {
      this.tag = 1
      if (e) {
        // console.log(e.path[1].children[0])
        e.path[1].children[0].style.backgroundColor = 'transparent'
        e.path[1].children[2].style.backgroundColor = 'transparent'
        e.path[0].style.backgroundColor = 'teal'
      }

      let axios = this.$axios.create()
      let fixedtime = 1603786271

      axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'post',
        url: "http://api.yumaoyou.cn/index.php/api_4/screen/offLine"
      }).then(res => {
        // console.log(res)
        this.is = false
        this.tableData = res.data.data
        this.total = res.data.total
        this.offline = res.data.offline

        let arr1 = ['一', '二'];
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i] != null) {
            // 版本号         
            this.tableData[i].code = arr1[this.tableData[i].code - 1] + '代';
            // 电箱号
            this.tableData[i].mzid = this.hexCharCodeToStr(this.tableData[i].mzid);
            // 版本号
            this.tableData[i].banben = this.tableData[i].banben ? this.hexCharCodeToStr(this.tableData[i].banben) : '- -';
            // 模组名称
            this.tableData[i].mozu = this.tableData[i].mozu ? this.hexCharCodeToStr(this.tableData[i].mozu) : '- -';

            // 通讯方式
            this.tableData[i].fen = this.tableData[i].fen + '台';

            // 是否带漏电
            if (this.tableData[i].lou == 1) {
              this.tableData[i].lou = '带漏电';
            } else {
              this.tableData[i].lou = '不带漏电';
            }

            // 主分类
            if (this.tableData[i].lei == 0) {
              this.tableData[i].lei = '总开关';
            } else {
              this.tableData[i].lei = '支路开关';
            }
            // 当前状态
            if (this.tableData[i].bz == 1) {
              this.tableData[i].bz = '入库';
            } else if (this.tableData[i].bz == 2 || this.tableData[i].bz == 4 || this.tableData[i].bz == 6 || this.tableData[i].bz == 8 || this.tableData[i].bz == 10) {
              this.tableData[i].bz = '保留';
            } else if (this.tableData[i].bz == 3) {
              this.tableData[i].bz = '出库';
            } else if (this.tableData[i].bz == 5) {
              this.tableData[i].bz = '地方仓库';
            } else if (this.tableData[i].bz == 7) {
              this.tableData[i].bz = '客户仓库';
            } else if (this.tableData[i].bz == 9) {
              this.tableData[i].bz = '故障';
            } else if (this.tableData[i].bz == 11) {
              this.tableData[i].bz = '正常运行';
            } else {
              this.tableData[i].bz = '被删除';
            }

            // 激活时间
            if (this.tableData[i].final_time <= fixedtime) {
              this.tableData[i].final_time = new Date(
                this.tableData[i].final_time * 1000
              ).Format("yy-MM-dd hh:mm:ss") + "之前";
            } else {
              this.tableData[i].final_time = new Date(
                this.tableData[i].final_time * 1000
              ).Format("yy-MM-dd hh:mm:ss");
            }

          }

        }
      })

      // http.getoutline()
      //   .then(res => {
      //     // console.log(res)
      //     this.tableData = res.data.data
      //     this.total = res.data.total
      //     this.offline = res.data.offline

      //     let arr1 = ['一', '二'];
      //     for (let i = 0; i < this.tableData.length; i++) {
      //       if (this.tableData[i] != null) {
      //         // 版本号         
      //         this.tableData[i].code = arr1[this.tableData[i].code - 1] + '代';
      //         // 电箱号
      //         this.tableData[i].mzid = this.hexCharCodeToStr(this.tableData[i].mzid);
      //         // 版本号
      //         this.tableData[i].banben = this.tableData[i].banben ? this.hexCharCodeToStr(this.tableData[i].banben) : '- -';
      //         // 模组名称
      //         this.tableData[i].mozu = this.tableData[i].mozu ? this.hexCharCodeToStr(this.tableData[i].mozu) : '- -';

      //         // 通讯方式
      //         this.tableData[i].fen = this.tableData[i].fen + '台';

      //         // 是否带漏电
      //         if (this.tableData[i].lou == 1) {
      //           this.tableData[i].lou = '带漏电';
      //         } else {
      //           this.tableData[i].lou = '不带漏电';
      //         }

      //         // 主分类
      //         if (this.tableData[i].lei == 0) {
      //           this.tableData[i].lei = '总开关';
      //         } else {
      //           this.tableData[i].lei = '支路开关';
      //         }
      //         // 当前状态
      //         if (this.tableData[i].bz == 1) {
      //           this.tableData[i].bz = '入库';
      //         } else if (this.tableData[i].bz == 2 || this.tableData[i].bz == 4 || this.tableData[i].bz == 6 || this.tableData[i].bz == 8 || this.tableData[i].bz == 10) {
      //           this.tableData[i].bz = '保留';
      //         } else if (this.tableData[i].bz == 3) {
      //           this.tableData[i].bz = '出库';
      //         } else if (this.tableData[i].bz == 5) {
      //           this.tableData[i].bz = '地方仓库';
      //         } else if (this.tableData[i].bz == 7) {
      //           this.tableData[i].bz = '客户仓库';
      //         } else if (this.tableData[i].bz == 9) {
      //           this.tableData[i].bz = '故障';
      //         } else if (this.tableData[i].bz == 11) {
      //           this.tableData[i].bz = '正常运行';
      //         } else {
      //           this.tableData[i].bz = '被删除';
      //         }

      //         // 激活时间
      //         this.tableData[i].final_time = new Date(
      //           this.tableData[i].final_time * 1000
      //         ).Format("yy-MM-dd hh:mm:ss");
      //       }

      //     }
      //   })
    },

    // 获取报警信息
    getalarm(e) {
      this.is = true
      this.tag = 2
      if (e) {
        e.path[1].children[0].style.backgroundColor = 'transparent'
        e.path[1].children[1].style.backgroundColor = 'transparent'
        e.path[0].style.backgroundColor = 'teal'
      }

      let axios = this.$axios.create()

      axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'post',
        url: "http://api.yumaoyou.cn/index.php/api_4/screen/jingInfo"
      }).then(res => {
        this.is = false
        // console.log(res)
        this.tableDataalarm = res.data.data
        for (let i = 0; i < this.tableDataalarm.length; i++) {
          // 线路
          this.tableDataalarm[i].aa = '线路' + this.tableDataalarm[i].aa;
          // 报警发生的时间        
          this.tableDataalarm[i].time = new Date(
            this.tableDataalarm[i].time * 1000
          ).Format("yy-MM-dd hh:mm:ss");
        }
      })

      // http.getbaojing()
      //   .then(res => {
      //     //   console.log(res)
      //     this.tableDataalarm = res.data.data
      //     for (let i = 0; i < this.tableDataalarm.length; i++) {
      //       // 线路
      //       this.tableDataalarm[i].aa = '线路' + this.tableDataalarm[i].aa;
      //       // 报警发生的时间        
      //       this.tableDataalarm[i].time = new Date(
      //         this.tableDataalarm[i].time * 1000
      //       ).Format("yy-MM-dd hh:mm:ss");
      //     }
      //   })
    },

    // 返回
    path2() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.getoutline()
    this.timer = setInterval(() => {
      this.getoutline()
    }, 30000)
  },

  destroyed() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="less" scoped>
.monitoring {
  width: 100%;
  height: 100%;
  background: url('../../public/static/images/3.jpg') no-repeat;
  p {
    margin: 0 !important;
  }
  .top {
    margin-top: 0 !important;
    // line-height: 65px;
    .ulLeft {
      display: block;
      // width: 100%;
      width: 620px;
      height: 65px;
      margin: 0;
      li {
        cursor: pointer;
        color: #fff;
        float: right;
        padding: 0 15px;
        img {
          width: 35px;
          border-radius: 50%;
          vertical-align: middle;
        }
        &:first-child {
          margin-right: 40px;
        }
      }
    }
    .ulRight {
      // padding-right: 60px;
      display: block;
      margin: 0;
      // width: 100%;
      li {
        cursor: pointer;
        color: #fff;
        float: right;
        padding: 0 15px;
        list-style: none;
        img {
          width: 35px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .t1 {
        margin-top: 18px;
      }
    }
    h2 {
      color: #fff;
      font-size: 24px;
      line-height: 65px;
      margin: 0;
    }
  }
  .el-row {
    // margin-top: 20px;
    margin-top: 1.5rem;
    text-align: center;
  }
  .tabheader {
    width: 100%;
    color: white;
    display: flex;
    .tab {
      flex: 1;
      text-align: center;
      padding: 20px;
      border: 1px solid;
      cursor: pointer;
    }
    .active {
      background: teal;
    }
  }
  .content {
    width: 100%;
    height: 86%;
    .el-table /deep/ td {
      background: none;
    }
    .outlinebox /deep/ .el-table,
    .alarminfo /deep/ .el-table,
    .el-table__expanded-cell {
      background-color: transparent;
    }

    .outlinebox /deep/ .el-table tr,
    .outlinebox /deep/ .el-table th,
    .alarminfo /deep/ .el-table tr,
    .alarminfo /deep/ .el-table th {
      background-color: transparent !important;
    }
    .outlinebox /deep/ .el-table--enable-row-transition .el-table__body td,
    .alarminfo /deep/ .el-table--enable-row-transition .el-table__body td,
    .el-table .cell {
      background-color: transparent;
      border-bottom: 1px solid gray !important;
    }

    .el-table--scrollable-y /deep/ .el-table__body-wrapper {
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #dddee0;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
      }
    }

    .outlinebox {
      // height: 769px;
      // height: 48rem;
      height: 100%;
      // overflow-y: scroll;
      // &::-webkit-scrollbar {
      //   /*滚动条整体样式*/
      //   width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      //   height: 1px;
      // }
      // &::-webkit-scrollbar-thumb {
      //   /*滚动条里面小方块*/
      //   border-radius: 10px;
      //   // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      //   background: #dddee0;
      // }
      // &::-webkit-scrollbar-track {
      //   /*滚动条里面轨道*/
      //   // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      //   border-radius: 10px;
      //   background: #fff;
      // }
    }

    .eq {
      width: 100%;
      height: 874px;
    }

    .alarminfo {
      height: 100%;
      // overflow-y: scroll;
      // &::-webkit-scrollbar {
      //   /*滚动条整体样式*/
      //   width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      //   height: 1px;
      // }
      // &::-webkit-scrollbar-thumb {
      //   /*滚动条里面小方块*/
      //   border-radius: 10px;
      //   // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      //   background: #dddee0;
      // }
      // &::-webkit-scrollbar-track {
      //   /*滚动条里面轨道*/
      //   // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      //   border-radius: 10px;
      //   background: #fff;
      // }
    }
  }
}
</style>