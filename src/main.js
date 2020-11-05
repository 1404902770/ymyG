import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Qs from 'qs'

// 引入axios
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios)

Vue.prototype.$axios = axios

import myechart from 'echarts'
Vue.prototype.$echarts = myechart
Vue.use(myechart)

// import shttp from './ajax/http'
// Vue.prototype.$shttp = shttp
// 引入font图标
import 'font-awesome/css/font-awesome.css'

// // 引入UEditor依赖
import '../public/static/ueditor/ueditor.config'
import '../public/static/ueditor/ueditor.all.js'
import '../public/static/ueditor/ueditor.parse.js'
import '../public/static/ueditor/lang/zh-cn/zh-cn'

// 引入使用elementUi
import './element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import elementUi from 'element-ui'
Vue.use(elementUi)

// dataV
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

// momentjs
import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn') // 汉化

// 时间方法
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, this.getFullYear() + '')
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt // new Date(1542274800000).Format('yy-MM-dd hh:mm:ss'); // 用法
}

// 裕茂优 - 16进制转字符串
Vue.prototype.hexCharCodeToStr = hexCharCodeStr => {
  if (hexCharCodeStr != '') {
    var trimedStr = hexCharCodeStr.trim()
    var rawStr =
      trimedStr.substr(0, 2).toLowerCase() === '0x'
        ? trimedStr.substr(2)
        : trimedStr
    var len = rawStr.length
    if (len % 2 !== 0) {
      // elementUi.Message.error('存在非法字符!')
      return ''
    }
    var curCharCode
    var resultStr = []
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16)
      resultStr.push(String.fromCharCode(curCharCode))
    }
    return resultStr.join('')
  }
}

// 判定input的值限制小数点后几位 和 不能大于多少或小于多少
Vue.prototype.oninput = (num, limit) => {
  var str = num
  var len1 = str.substr(0, 1)
  var len2 = str.substr(1, 1) // 如果第一位是0，第二位不是点，就用数字把点替换掉
  if (str.length > 1 && len1 == 0 && len2 != '.') {
    str = str.substr(1, 1)
  } // 第一位不能是.
  if (len1 == '.') {
    str = ''
  } // 限制只能输入一个小数点
  if (str.indexOf('.') != -1) {
    var str_ = str.substr(str.indexOf('.') + 1)
    if (str_.indexOf('.') != -1) {
      str = str.substr(0, str.indexOf('.') + str_.indexOf('.') + 1)
    }
  } // 正则替换
  str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
  if (limit / 1 === 1) {
    str = str.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/, '$1') // 小数点后只能输 1 位
  } else {
    str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1') // 小数点后只能输 2 位
  }
  return str // 用法：在input中 @keyup.native="data绑定的值 = oninput(data绑定的值,小数后几位)"
}

// 全局Loading
const showLoading = () => {
  elementUi.Loading.service({
    text: '正在加载请稍后',
    fullscreen: true,
    background: 'rgba(0,0,0,.4)'
  })
}
const closeLoading = () => {
  elementUi.Loading.service({}).close()
}

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // console.log(config)
    // let token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.token = localStorage.getItem('token')
    // } else {
    //   localStorage.clear()
    //   // router.push('/')
    //   elementUi.Message.error('登录已失效，请重新登录')
    // }
    if (config.method === 'post') {
      if (
        config.url !=
        'http://api.yumaoyou.cn/index.php/api/admin/appBarUpdate' &&
        config.url !=
        'http://api.yumaoyou.cn/index.php/api/admin/zcfabuImg' &&
        config.url !=
        'http://api.yumaoyou.cn/index.php/api/admin/bannerImgUpload' &&
        config.url !=
        'http://api.yumaoyou.cn/index.php/api/admin/updateZcfabuImg' &&
        config.url != 'http://api.yumaoyou.cn/api/admin/zcTextImg'
      ) {
        config.data = Qs.stringify(config.data)
      }
      // config.data = Qs.stringify(config.data)
    }
    if (
      config.url ==
      'http://api.yumaoyou.cn/index.php/api/admin/appBarUpdate'
    ) {
      closeLoading()
    } else {
      showLoading()
    }

    return config
  }
  // function(error) {
  //   closeLoading()
  //   return Promise.reject(error)
  // }
)

// // 响应拦截器
axios.interceptors.response.use(
  function (response) {
    // console.log(response)
    setTimeout(function () {
      closeLoading()
    }, 500)
    // 请求成功
    if (response.status == 200) {
      return response
      // token失效
    } else if (response.status == 401) {
      localStorage.clear()
      router.push('/')
      elementUi.Message.error(response.data.message + ',请联系管理员!')
      closeLoading()
      return false
      // 服务器失败
    } else {
      elementUi.Message.error(response.data.message + ',请联系管理员!')
      closeLoading()
      return false
    }
  }
  // function(error) {
  //   elementUi.Message.error('请联系管理员!')
  //   closeLoading()
  //   return Promise.reject(error)
  // }
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
