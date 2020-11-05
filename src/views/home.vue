<template>
  <!-- <h1>监控</h1> -->
  <div class="monitoring">
    <el-row class="top">
      <el-col :span="10">
        <ul class="ulLeft">
        </ul>
      </el-col>
      <el-col
        style="display:flex;margin:0 auto"
        :span="6"
      >
        <dv-decoration-8 style="width:160px;height:50px;margin-right: -74px;" />

        <h2 style="margin-top: -28px;">设备监控平台</h2>
        <dv-decoration-8
          :reverse="true"
          style="width:160px;height:50px;margin-left: -70px;"
        />

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

      <div class="tab">
        <img
          class="topimg"
          src="../../public/static/images/jzxz2.png"
          alt=""
        >
        <div class="tabinfo">
          <p>总设备</p>
          <span>{{total+"台"}}</span>
        </div>
      </div>

      <div class="tab">
        <img
          class="topimg"
          src="../../public/static/images/jzxz2.png"
          alt=""
        >
        <div class="tabinfo">
          <p>在线设备</p>
          <span>{{online+"台"}}</span>
        </div>
      </div>

      <div
        class="tab"
        @click="switchtab(1,'离线设备')"
      >
        <img
          class="topimg"
          src="../../public/static/images/jzxz2.png"
          alt=""
        >
        <div class="tabinfo">
          <p>离线设备</p>
          <span>{{offline+"台"}}</span>
        </div>
      </div>

      <div
        class="tab"
        @click="switchtab(2,'报警信息')"
      >
        <img
          class="topimg"
          src="../../public/static/images/jzxz2.png"
          alt=""
        >
        <div class="tabinfo">
          <p>报警信息</p>
          <span>{{tableDataalarm.length+"条"}}</span>
        </div>
        <!-- {{ tableDataalarm.length != 0 ? " : " + tableDataalarm.length+"条" : ""}} -->
      </div>

      <!-- <div class="tab">总设备 : {{total+"台"}}</div>
      <div
        class="tab active"
        @click="getoutline"
      >离线主机 : {{offline+"台"}}</div>
      <div
        class="tab"
        @click="getalarm"
      >报警信息{{ tableDataalarm.length != 0 ? " : " + tableDataalarm.length+"条" : ""}}</div> -->

    </div>

    <div class="content">
      <div class="leftcontent">
        <div class="two">
          <dv-border-box-13>
            <div
              style="width:100%;height:300px"
              id="echarts1"
            ></div>
          </dv-border-box-13>
        </div>

        <div class="two">
          <dv-border-box-13>
            <el-table
              :data="tableData"
              height="300px"
              empty-text='暂无离线设备'
              :header-cell-style="{color:'#fff'}"
              style="width: 90%;color:white;margin:0 auto"
            >

              <el-table-column
                prop="mzid"
                show-overflow-tooltip
                label="电箱号"
                align="center"
                min-width="120"
              ></el-table-column>

              <el-table-column
                prop="nick"
                show-overflow-tooltip
                label="账号昵称"
                align="center"
                min-width="100"
              ></el-table-column>

              <el-table-column
                prop="off_line"
                show-overflow-tooltip
                label="离线时长"
                align="center"
                min-width="100"
              ></el-table-column>

            </el-table>
          </dv-border-box-13>
        </div>

      </div>

      <div class="centercontent">
        <dv-border-box-11
          :title="titletext"
          style="padding-top:10px"
        >
          <div
            style="height:100%"
            v-if="tag==1"
          >
            <div class="mar">
              <div class="selectbox">
                <el-select
                  size="mini"
                  :popper-append-to-body="false"
                  v-model="selvalue1"
                  clearable
                  placeholder="请选择企业"
                  @change="getLines"
                >
                  <el-option
                    v-for="(item,index) in companyarr"
                    :key="index"
                    :label="item.name"
                    :value="item.gid"
                  ></el-option>
                </el-select>
              </div>

              <div
                v-if="selvalue1!=''"
                style="float:right;color:white;flex:1;text-align:right;margin-right:30px"
              >共计：{{tableData!=[]? tableData.length:""}}</div>

            </div>
            <el-table
              :data="tableData"
              height="90%"
              empty-text='暂无离线设备'
              :header-cell-style="{color:'#fff'}"
              style="width: 90%;color:white;margin:0 auto"
            >
              <!-- <el-table-column
              prop="mozu"
              show-overflow-tooltip
              label="模组名称"
              align="center"
              min-width="100"
            ></el-table-column> -->

              <el-table-column
                prop="mzid"
                show-overflow-tooltip
                label="电箱号"
                align="center"
                min-width="100"
              ></el-table-column>

              <!-- <el-table-column
              prop="mzname"
              show-overflow-tooltip
              label="电箱名称"
              align="center"
              min-width="100"
            ></el-table-column> -->

              <el-table-column
                prop="fen"
                show-overflow-tooltip
                label="分机个数"
                align="center"
                min-width="60"
              ></el-table-column>

              <!-- <el-table-column
              prop="xinghao"
              show-overflow-tooltip
              label="型号"
              align="center"
              min-width="100"
            ></el-table-column> -->

              <!-- <el-table-column
              prop="lou"
              show-overflow-tooltip
              label="是否漏电"
              align="center"
              min-width="60"
            ></el-table-column> -->

              <el-table-column
                prop="phone"
                show-overflow-tooltip
                label="联系方式"
                align="center"
                min-width="90"
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
            style="height:100%"
            v-else
          >
            <div class="mar">
              <div class="selectbox">
                <el-select
                  size="mini"
                  :popper-append-to-body="false"
                  v-model="selvalue2"
                  clearable
                  placeholder="请选择企业"
                  @change="getcomalarm"
                >
                  <el-option
                    v-for="item in companyarr"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </div>

              <!-- <div class="selectbox">
                <el-select
                  size="mini"
                  :popper-append-to-body="false"
                  v-model="selvalue3"
                  clearable
                  placeholder="请选择类型"
                  @change="getCurrent"
                >
                  <el-option
                    v-for="item in jtype"
                    :key="item.value"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </div> -->
            </div>
            <el-table
              :data="tableDataalarm"
              height="90%"
              empty-text='暂无报警信息'
              :header-cell-style="{color:'#fff'}"
              style="width: 90%;color:white;margin:0 auto"
            >

              <!-- <el-table-column
              label="电箱号"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.nid) }}</span>
              </template>
            </el-table-column> -->

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
                label="电箱名称"
                align="center"
                min-width="70"
              ></el-table-column>

              <!-- <el-table-column
              prop="jianzhu"
              show-overflow-tooltip
              label="电箱地址"
              align="center"
              min-width="80"
            ></el-table-column> -->

              <!-- <el-table-column
              prop="name"
              show-overflow-tooltip
              label="线路名称"
              align="center"
              min-width="80"
            ></el-table-column> -->

              <el-table-column
                prop="g_name"
                show-overflow-tooltip
                label="企业"
                align="center"
                min-width="60"
              ></el-table-column>

              <el-table-column
                prop="aa"
                show-overflow-tooltip
                label="线路"
                align="center"
                min-width="60"
              ></el-table-column>

              <!-- <el-table-column
              prop="local"
              show-overflow-tooltip
              label="线路地址"
              align="center"
              min-width="100"
            ></el-table-column> -->

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

        </dv-border-box-11>
      </div>

      <div class="rightcontent">
        <div class="two">
          <dv-border-box-13>
            <div
              style="width:100%;height:300px"
              id="echarts2"
            ></div>
          </dv-border-box-13>
        </div>

        <div class="two">
          <dv-border-box-13>
            <div
              style="width:100%;height:300px"
              id="echarts3"
            ></div>
          </dv-border-box-13>

        </div>

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
      // 离线设备
      tableData: [],
      // 设备离线时间
      eqData: [],

      // 报警信息
      tableDataalarm: [],
      // 筛选报警信息
      selectalarm: [],
      // 报警类型
      jtype: [],
      // 报警次数
      jtotal: [],
      // 最近24小时报警次数最多的十台设备
      jmzname: [],
      // 最近24小时报警次数最多的十台设备的报警数量
      jnum: [],

      // 中间标题
      titletext: "离线设备",

      // 离线主机数
      offline: "",
      // 在线主机数
      online: "",
      //   主机总数
      total: "",

      // 设备
      eq: [],
      // 公司
      compony: [],

      // 状态
      tag: 1,

      // 定时器
      timer: "",

      selvalue1: "",
      companyarr: [],
      selvalue2: "",
      selvalue3: ""
    }
  },
  methods: {

    // 获取离线主机
    getoutline(e) {

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
        this.tableData = res.data.data
        this.total = res.data.total
        this.offline = res.data.offline
        this.online = res.data.total - res.data.offline

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

            // 离线时间
            if (this.tableData[i].final_time <= fixedtime) {
              this.tableData[i].final_time = new Date(
                this.tableData[i].final_time * 1000
              ).Format("yy-MM-dd hh:mm:ss") + "之前";
            } else {
              this.tableData[i].final_time = new Date(
                this.tableData[i].final_time * 1000
              ).Format("yy-MM-dd hh:mm:ss");
            }

            // 离线时长
            if (Math.floor(this.tableData[i].off_line / 60) <= 60) {
              this.tableData[i].off_line = Math.floor(this.tableData[i].off_line / 60) + "分钟";
            }
            else if (Math.floor(this.tableData[i].off_line / 60 / 60) <= 60) {
              this.tableData[i].off_line = Math.floor(this.tableData[i].off_line / 60 / 60) + "小时";
            } else {
              this.tableData[i].off_line = Math.floor(this.tableData[i].off_line / 60 / 60 / 24) + "天";
            }

          }

        }
        sessionStorage.setItem('tableData', JSON.stringify(this.tableData))

      })
    },

    // 获取报警信息
    getalarm(e) {
      let axios = this.$axios.create()

      axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'post',
        url: "http://api.yumaoyou.cn/index.php/api_4/screen/jingInfo"
      }).then(res => {
        res.data.lei.forEach(val => {
          this.jtype.push(val.jtype)
          this.jtotal.push(val.total)
        })

        this.tableDataalarm = res.data.data
        sessionStorage.setItem('tableDataalarm', JSON.stringify(res.data.data))


        this.getStudent2(this.tableDataalarm)


        for (let i = 0; i < this.tableDataalarm.length; i++) {
          // 电箱号
          this.tableDataalarm[i].nid = this.hexCharCodeToStr(this.tableDataalarm[i].nid);
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

    // 点击切换报警和离线
    switchtab(num, title) {
      this.tag = num
      this.titletext = title
    },

    // 获取公司的所有设备
    getcompany() {
      http.getcomeq().then(res => {
        // console.log(res)
        for (var i = 0; i < 10; i++) {
          // res.data.data.forEach(val => {
          this.eq.push(res.data.data[i].neted + res.data.data[i].mached)
          this.compony.push(res.data.data[i].name)
          // })
        }
        res.data.data.forEach(val => {
          this.companyarr.push({ 'name': val.name, 'gid': val.gid })
        })
        // console.log(this.companyarr)
        this.getStudent1()

      }).catch(err => {
        // console.log(err)
      })
    },

    // 根据企业筛选离线设备筛选
    getLines(val) {
      if (val) {
        let fixedtime = 1603786271

        http.getgroup({ gid: val }).then(res => {
          // console.log(res)
          if (res.data.data) {
            this.tableData = res.data.data

            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i] != null) {
                // 电箱号
                this.tableData[i].mzid = this.hexCharCodeToStr(this.tableData[i].mzid);

                this.tableData[i].fen = this.tableData[i].fen + '台';

                // 离线时间
                if (this.tableData[i].final_time <= fixedtime) {
                  this.tableData[i].final_time = new Date(
                    this.tableData[i].final_time * 1000
                  ).Format("yy-MM-dd hh:mm:ss") + "之前";
                } else {
                  this.tableData[i].final_time = new Date(
                    this.tableData[i].final_time * 1000
                  ).Format("yy-MM-dd hh:mm:ss");
                }

                // 离线时长
                if (Math.floor(this.tableData[i].off_line / 60) <= 60) {
                  this.tableData[i].off_line = Math.floor(this.tableData[i].off_line / 60) + "分钟";
                }
                else if (Math.floor(this.tableData[i].off_line / 60 / 60) <= 60) {
                  this.tableData[i].off_line = Math.floor(this.tableData[i].off_line / 60 / 60) + "小时";
                } else {
                  this.tableData[i].off_line = Math.floor(this.tableData[i].off_line / 60 / 60 / 24) + "天";
                }

              }

            }
          } else {
            this.tableData = []
          }
        }).then(err => {
          // console.log(err)
        })
      } else {
        this.tableData = JSON.parse(sessionStorage.getItem('tableData'))
      }

    },

    // 根据企业筛选报警信息
    getcomalarm(item) {
      // console.log(item)
      this.tableDataalarm = JSON.parse(sessionStorage.getItem('tableDataalarm'))
      let arr = []
      if (item) {
        for (var i = 0; i < this.tableDataalarm.length; i++) {
          if (this.tableDataalarm[i].g_name == item) {
            arr.push(this.tableDataalarm[i])
          }
        }

        this.tableDataalarm = arr
        for (let i = 0; i < this.tableDataalarm.length; i++) {
          // 电箱号
          this.tableDataalarm[i].nid = this.hexCharCodeToStr(this.tableDataalarm[i].nid);
          // 线路
          this.tableDataalarm[i].aa = '线路' + this.tableDataalarm[i].aa;
          // 报警发生的时间        
          this.tableDataalarm[i].time = new Date(
            this.tableDataalarm[i].time * 1000
          ).Format("yy-MM-dd hh:mm:ss");
        }
      } else {
        this.tableDataalarm = JSON.parse(sessionStorage.getItem('tableDataalarm'))
        for (let i = 0; i < this.tableDataalarm.length; i++) {
          // 电箱号
          this.tableDataalarm[i].nid = this.hexCharCodeToStr(this.tableDataalarm[i].nid);
          // 线路
          this.tableDataalarm[i].aa = '线路' + this.tableDataalarm[i].aa;
          // 报警发生的时间        
          this.tableDataalarm[i].time = new Date(
            this.tableDataalarm[i].time * 1000
          ).Format("yy-MM-dd hh:mm:ss");
        }
      }

    },
    // 根据报警类型筛选报警信息
    getCurrent(item) {
      console.log(item)
    },

    // 最近24小时报警次数最多的十台设备及其报警数量
    get24jingmax() {
      http.get24jingmax().then(res => {
        // console.log(res.data.data)
        res.data.data.forEach(val => {
          this.jmzname.push(val.jianzhu)
          this.jnum.push(val.tol)
        })
        this.getStudent3()
      }).catch(err => {
        // console.log(err)
      })
    },

    // echars - 柱形图 - 每个公司有多少设备
    getStudent1() {
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts1"));
      //   $(window).resize(function () {
      //     student.resize();
      //   });
      student.setOption({
        title: {
          left: 'center',
          text: '设备数量 - 按企业统计',
          top: 20,
          textStyle: {
            color: "#FFF", //图例文字颜色，大小等配置
            fontSize: 14
          }
        },
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "cross",
        //     label: {
        //       backgroundColor: "#008080"
        //     }
        //   }
        // },
        xAxis: {
          type: "category",
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#fff',
              fontSize: '9',

            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          },
          data: this.compony,
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            data: this.eq,
            type: "bar",
            // showBackground: true,
            // backgroundStyle: {
            //   color: "rgba(220, 220, 220, 0.8)"
            // },
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#c23531",
                    "#AFEEEE",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}\n{c}",
                  formatter: "{c}"
                }
              }
            },
            // barWidth: 30 //柱图宽度
          }
        ]
      });
    },

    // echars - 柱形图 - 各个类型报警数量
    getStudent2(alarm) {
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts2"));
      //   $(window).resize(function () {
      //     student.resize();
      //   });
      student.setOption({
        title: {
          left: 'center',
          text: '报警信息分类',
          top: 20,
          textStyle: {
            color: "#FFF", //图例文字颜色，大小等配置
            fontSize: 14
          }
        },
        xAxis: {
          type: "category",
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#fff',
              fontSize: '12',

            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          },
          data: this.jtype,
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            data: this.jtotal,
            type: "bar",
            // showBackground: true,
            // backgroundStyle: {
            //   color: "rgba(220, 220, 220, 0.8)"
            // },
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#c23531",
                    "#AFEEEE",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}\n{c}",
                  formatter: "{c}"
                }
              }
            },
            barWidth: 30 //柱图宽度
          }
        ]
      });

      // student.on('click', function (params) {
      //   // console.log(params);
      //   this.tableDataalarm = []
      //   for (var i = 0; i < alarm.length; i++) {
      //     if (alarm[i].desc == params.name) {
      //       this.tableDataalarm.push(alarm[i])
      //     }
      //   }
      // });
    },

    // echars - 柱形图 - 最近24小时报警次数最多的十台设备及其报警数量
    getStudent3() {
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts3"));
      //   $(window).resize(function () {
      //     student.resize();
      //   });
      student.setOption({
        title: {
          left: 'center',
          text: '24小时报警次数设备统计',
          top: 20,
          textStyle: {
            color: "#FFF", //图例文字颜色，大小等配置
            fontSize: 14
          }
        },
        xAxis: {
          type: "category",
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#fff',
              fontSize: '12',

            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          },
          data: this.jmzname,
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            data: this.jnum,
            type: "bar",
            // showBackground: true,
            // backgroundStyle: {
            //   color: "rgba(220, 220, 220, 0.8)"
            // },
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#c23531",
                    "#AFEEEE",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}\n{c}",
                  formatter: "{c}"
                }
              }
            },
            barWidth: 30 //柱图宽度
          }
        ]
      });
    },

    // 返回
    path2() {
      this.$router.push({ path: '/funuser' })
      sessionStorage.setItem('num', '1')
    }
  },
  mounted() {
    this.getoutline()
    this.getcompany()
    this.getalarm()
    this.get24jingmax()

    // this.timer = setInterval(() => {
    //   this.getoutline()
    // }, 30000)
  },

  destroyed() {
    // clearInterval(this.timer)
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
    padding-top: 20px;
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
    justify-content: space-around;
    .tab {
      display: flex;
      text-align: center;
      position: relative;
      cursor: pointer;
      .topimg {
        width: 140px;
        height: 140px;
        position: relative;
      }
      .tabinfo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .active {
      background: teal;
    }
  }
  .content {
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: space-around;
    // height: 86%;
    .leftcontent {
      width: 23%;
    }

    .centercontent {
      width: 50%;
      .mar {
        // margin-bottom: 56px;
        display: flex;
        // justify-content: space-around;
        justify-content: flex-start;
        margin-top: 19px;
        margin-left: 20px;

        // 电流统计图选择
        .selectbox {
          // float: left;
          // margin: 22px 0 0 72px;
          .el-select /deep/ .el-input__inner {
            color: white;
            background-color: transparent !important;
          }
          .el-select /deep/ .el-popper {
            background-color: rgba(0, 0, 0, 1) !important;
            .el-select-dropdown__item {
              color: white !important;
            }
            .hover {
              background-color: rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
    }
    .centercontent /deep/ .border-box-content {
      padding-top: 40px;
      box-sizing: border-box;
    }

    .rightcontent {
      width: 23%;
    }

    .two {
      margin-top: 22px;
    }

    .el-table /deep/ td {
      background: none;
    }
    .leftcontent /deep/ .el-table,
    .centercontent /deep/ .el-table,
    .el-table__expanded-cell {
      background-color: transparent;
    }

    .leftcontent /deep/ .el-table tr,
    .leftcontent /deep/ .el-table th,
    .centercontent /deep/ .el-table tr,
    .centercontent /deep/ .el-table th {
      background-color: transparent !important;
    }
    .leftcontent /deep/ .el-table--enable-row-transition .el-table__body td,
    .centercontent /deep/ .el-table--enable-row-transition .el-table__body td,
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
        background: #052792;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #066cac;
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