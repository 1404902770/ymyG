<template>
  <div class="index">
    <div class="box">
      <div class="leftone">
        <div class="two">
          <!-- 空心饼图 -->
          <div id="myChartfive" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
      <div class="rightone">
        <div class="two"></div>
      </div>
      <div class="bottombox">
        <div class="botwo">
          <div id="echarts" :style="{ width: '100%', height: '100%' }"></div>
        </div>
        <div class="bothree">
          <div id="histogram" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>

    <div class="map">
      <div id="chinaMap" :style="{ width: '600px', height: '400px' }"></div>
    </div>

    <!-- <div class="logotext">
      <h1>云 控 管 理 平 台</h1>
    </div>-->

    <!-- <div class="three"></div>
    <div class="four"></div>-->

    <!-- <div class="five">
      <div id="myChartfive" :style="{ width: '420px', height: '270px' }"></div>
    </div>
    <div class="six">
      <div id="myChartsix" :style="{ width: '420px', height: '270px' }"></div>
    </div>-->

    <!-- <el-container>
      <el-header>
        顶部导航
        <headnav></headnav>
      </el-header>
      <el-container>
        <el-aside width="410px">
          左侧导航
        </el-aside>
        <el-main>
          主体部分
          <h1>首页</h1>
        </el-main>
      </el-container>
    </el-container>-->
  </div>
</template>
<script>
// import headnav from '../components/headnav'
require('echarts/lib/chart/bar') // 引入柱状图组件
require('echarts/lib/chart/pie') // 引入饼状图组件
require('echarts/map/js/china.js') // 引入中国地图组件
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/theme/macarons') //引入主题
require('echarts/theme/shine') //引入主题

// import option from '../../public/static/js/map-option'
import $ from 'jquery'
let echarts = require('echarts/lib/echarts')
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      chart: null
    }
  },
  // components: {
  //   headnav
  // },
  methods: {
    // 折线图
    picline() {
      // var echarts = require('echarts')
      let myChart = echarts.init(document.getElementById('echarts'))
      $(window).resize(function() {
        myChart.resize()
      })
      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: {
            textStyle: {
              color: '#fff'
              // fontSize: '16'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },

        series: [
          {
            smooth: true,
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {
              type: 'default',
              //渐变色实现
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1, //变化度
                //三种由深及浅的颜色
                [
                  {
                    offset: 0,
                    color: '#3ebf9b'
                  },
                  {
                    offset: 0.3,
                    color: '#267268'
                  },
                  {
                    offset: 0.7,
                    color: '#14323f'
                  }
                ]
              )
            },
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true
                },
                // borderColor: 'red', // 拐点边框颜色
                lineStyle: {
                  // width: 5 // 设置线宽
                  // type: 'dotted' //'dotted'虚线 'solid'实线
                },
                lineStyle: {
                  //线的颜色
                  color: '#14323f'
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },

    // 饼图
    piechart() {
      let myChart = echarts.init(document.getElementById('myChartfive'))
      $(window).resize(function() {
        myChart.resize()
      })
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          bottom: 30,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          textStyle: {
            //图例文字的样式
            color: '#fff'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['30%', '45%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,

            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold'
              }
            },

            label: {
              //饼图图形上的文本标签
              normal: {
                show: false,
                position: 'center' //标签的位置
                // textStyle: {
                //   // fontWeight: 300,
                //   fontSize: 16 //文字的字体大小
                // }
              }
            },

            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },

    // 柱状图
    histogram() {
      let myChart = echarts.init(document.getElementById('histogram'))
      $(window).resize(function() {
        myChart.resize()
      })
      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              //x轴文字的配置
              textStyle: {
                color: 'rgba(219,225,255,1)',
                margin: 15
              }
              // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              //y轴文字的配置
              textStyle: {
                color: 'rgba(219,225,255,1)',
                margin: 15
              }
              // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
            }
          }
        ],
        series: [
          {
            // name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            markPoint: {
              data: [
                // value表示你标注中想要展示的数字或者提示信息
                // xAxis表示标注的x轴坐标
                // yAxis表示标注的y轴坐标
                { value: '10', xAxis: 0, yAxis: 10 },
                { value: '52', xAxis: 1, yAxis: 52 },
                { value: '200', xAxis: 2, yAxis: 200 },
                { value: '334', xAxis: 3, yAxis: 334 },
                { value: '390', xAxis: 4, yAxis: 390 },
                { value: '330', xAxis: 5, yAxis: 330 },
                { value: '220', xAxis: 6, yAxis: 220 }
              ]
            },
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myChart.setOption(option)
    },

    // echarts绘制地图
    drawChinaMap() {
      let myCharts = echarts.init(document.getElementById('chinaMap'))
      let options = {
        title: {
          text: '',
          subtext: '',
          left: ''
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['', '', '']
        },
        visualMap: {
          min: 0,
          max: 2500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          textStyle: {
            color: 'white'
          }
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true }
          }
        },
        series: [
          {
            name: '',
            type: 'map',
            mapType: 'china',
            roam: true,
            showLegendSymbol: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: '北京', value: Math.round(Math.random() * 1000) },
              { name: '天津', value: Math.round(Math.random() * 1000) },
              { name: '上海', value: Math.round(Math.random() * 1000) },
              { name: '重庆', value: Math.round(Math.random() * 1000) },
              { name: '河北', value: Math.round(Math.random() * 1000) },
              { name: '河南', value: Math.round(Math.random() * 1000) },
              { name: '云南', value: Math.round(Math.random() * 1000) },
              { name: '辽宁', value: Math.round(Math.random() * 1000) },
              { name: '黑龙江', value: Math.round(Math.random() * 1000) },
              { name: '湖南', value: Math.round(Math.random() * 1000) },
              { name: '安徽', value: Math.round(Math.random() * 1000) },
              { name: '山东', value: Math.round(Math.random() * 1000) },
              { name: '新疆', value: Math.round(Math.random() * 1000) },
              { name: '江苏', value: Math.round(Math.random() * 1000) },
              { name: '浙江', value: Math.round(Math.random() * 1000) },
              { name: '江西', value: Math.round(Math.random() * 1000) },
              { name: '湖北', value: Math.round(Math.random() * 1000) },
              { name: '广西', value: Math.round(Math.random() * 1000) },
              { name: '甘肃', value: Math.round(Math.random() * 1000) },
              { name: '山西', value: Math.round(Math.random() * 1000) },
              { name: '内蒙古', value: Math.round(Math.random() * 1000) },
              { name: '陕西', value: Math.round(Math.random() * 1000) },
              { name: '吉林', value: Math.round(Math.random() * 1000) },
              { name: '福建', value: Math.round(Math.random() * 1000) },
              { name: '贵州', value: Math.round(Math.random() * 1000) },
              { name: '广东', value: Math.round(Math.random() * 1000) },
              { name: '青海', value: Math.round(Math.random() * 1000) },
              { name: '西藏', value: Math.round(Math.random() * 1000) },
              { name: '四川', value: Math.round(Math.random() * 1000) },
              { name: '宁夏', value: Math.round(Math.random() * 1000) },
              { name: '海南', value: Math.round(Math.random() * 1000) },
              { name: '台湾', value: Math.round(Math.random() * 1000) },
              { name: '香港', value: Math.round(Math.random() * 1000) },
              { name: '澳门', value: Math.round(Math.random() * 1000) }
            ]
          },
          {
            name: '',
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: '北京', value: Math.round(Math.random() * 1000) },
              { name: '天津', value: Math.round(Math.random() * 1000) },
              { name: '上海', value: Math.round(Math.random() * 1000) },
              { name: '重庆', value: Math.round(Math.random() * 1000) },
              { name: '河北', value: Math.round(Math.random() * 1000) },
              { name: '安徽', value: Math.round(Math.random() * 1000) },
              { name: '新疆', value: Math.round(Math.random() * 1000) },
              { name: '浙江', value: Math.round(Math.random() * 1000) },
              { name: '江西', value: Math.round(Math.random() * 1000) },
              { name: '山西', value: Math.round(Math.random() * 1000) },
              { name: '内蒙古', value: Math.round(Math.random() * 1000) },
              { name: '吉林', value: Math.round(Math.random() * 1000) },
              { name: '福建', value: Math.round(Math.random() * 1000) },
              { name: '广东', value: Math.round(Math.random() * 1000) },
              { name: '西藏', value: Math.round(Math.random() * 1000) },
              { name: '四川', value: Math.round(Math.random() * 1000) },
              { name: '宁夏', value: Math.round(Math.random() * 1000) },
              { name: '香港', value: Math.round(Math.random() * 1000) },
              { name: '澳门', value: Math.round(Math.random() * 1000) }
            ]
          },
          {
            name: '',
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: '北京', value: Math.round(Math.random() * 1000) },
              { name: '天津', value: Math.round(Math.random() * 1000) },
              { name: '上海', value: Math.round(Math.random() * 1000) },
              { name: '广东', value: Math.round(Math.random() * 1000) },
              { name: '台湾', value: Math.round(Math.random() * 1000) },
              { name: '香港', value: Math.round(Math.random() * 1000) },
              { name: '澳门', value: Math.round(Math.random() * 1000) }
            ]
          }
        ]
      }
      myCharts.setOption(options)
    }
  },
  updated() {
    if (!this.chart) {
      this.initChart()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  computed: {},

  mounted() {
    this.picline()
    this.piechart()
    this.histogram()
    this.drawChinaMap()
  }
}
</script>
<style lang="less">
.index {
  width: 100%;
  height: 100%;
  background: url(../../public/static/images/web01.jpg) no-repeat no-repeat;
}
.leftone,
.rightone,
.four,
.five,
.six {
  width: 24%;
  height: 40%;
  // overflow: hidden;
}
.leftone {
  float: left;
  padding-top: 80px;
}

.rightone {
  float: right;
  padding-top: 80px;
}

.two {
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  background: url(../../public/static/images/home3.png) no-repeat no-repeat;
  background-size: 100% 100%;
}
.three {
  margin-top: 8%;
  width: 100%;
  height: 100%;
  background: url(../../public/static/images/home3.png) no-repeat no-repeat;
  background-size: 100% 100%;
}

.four {
  // position: absolute;
  // bottom: 40px;
  // right: 0;
  background: url(../../public/static/images/home3.png) no-repeat no-repeat;
  background-size: 100% 100%;
}
.five {
  position: absolute;
  bottom: 40px;
  right: 500px;
  background: url(../../public/static/images/home3.png) no-repeat no-repeat;
  background-size: 100% 100%;
}
.six {
  position: absolute;
  bottom: 40px;
  left: 500px;
  background: url(../../public/static/images/home3.png) no-repeat no-repeat;
  background-size: 100% 100%;
}
.logotext {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  color: white;
  font-size: 24px;
  h1 {
    margin-top: 14px;
  }
}

.map {
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bottombox {
  display: flex;
  height: 40%;
  width: 100%;
  padding-top: 5%;
  .botwo,
  .bothree {
    width: 45%;
    height: 100%;
    background: url(../../public/static/images/home3.png) no-repeat no-repeat;
    background-size: 100% 100%;
  }
}
.box {
  width: 97%;
  height: 100%;
  margin: 0 auto;
}

.bothree {
  margin-left: 20%;
}
</style>
