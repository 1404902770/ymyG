import Vue from 'vue'
const urlType = 2
let aapi, bapi
if (urlType == 1) {
  aapi = '/aapi'
  bapi = '/aapi'
} else {
  aapi = 'http://a.yumaoyou.cn:8008/index.php'
  bapi = 'http://a.yumaoyou.cn:8008/index.php'
}
// 用户登录
const LOGIN = bapi + '/appv1/usdpc2/userLogin'

// ---------------------------新闻图接口---------------------------
// 新闻发布接口
const SENDNEWS = bapi + '/appv1/usdpc2/zcfabu'
// 获取新闻列表
const GETNEWSLIST = bapi + '/appv1/com/zclist'
// 修改新闻
const UODATENEWS = bapi + '/appv1/usdpc2/updatezcCon'
// 修改新闻封面
const UPDATENEWSPIC = bapi + '/appv1/usdpc2/zcfabuImg'
// 删除新闻
const DELETENEW = bapi + '/appv1/usdpc2/delzcList'

// ---------------------------App接口---------------------------
// App更新发布
const APPUPDATE = bapi + '/appv1/usdpc2/appUpdate'

// ---------------------------企业接口---------------------------
//企业注册登记
const REGISTERED = aapi + '/push/pc/inputCompanyInfo'
// 企业开通账号
const OPENFUNUSER = aapi + '/push/Pc/companyUser'
// 全部企业列表
const ALLCOMPANY = bapi + '/appv1/usdpc2/backCompany'

// 企业列表
const GETFIRMLIST = bapi + '/appv1/usdpc2/companyList'

// 更新企业基本信息

const UPDATEQIYE = aapi + '/push/pc/updateCompanyInfo'
// 更新企业联系人
const UPDATEUSER = aapi + '/push/pc/updateCompanyUserInfo'

// ---------------------------设备接口---------------------------
// 设备入库
const PUTEQ = aapi + '/push/app/rukushebei'
// 入库查询
const GETEQLIST = bapi + '/appv1/usdpc2/neteList'
// 用户绑定设备
const BANDEQ = aapi + '/push/pc/userBindMach'
// 设备与用户解绑
const UNBANDEQ = aapi + '/push/pc/userUnbindMach'
// 绑定设备查询
const GETBANGEQ = bapi + '/appv1/usdpc2/companyMachList'
// 删除设备
const DELETEEQ = aapi + '/push/pc/delNeted'

// 用户列表
const GETUSERLIST = bapi + '/appv1/usdpc2/userList'

// 检索设备类型
const GETEQTYPE = bapi + '/appv1/usdpc2/searchNeted'

// ---------------------------轮播图接口---------------------------
// 获取轮播图列表
const GETBANNERLIST = bapi + '/appv1/usdpc2/bannerList'
// 修改轮播图
const UPDATEBANNER = bapi + '/appv1/usdpc2/bannerUpdate'
// 是否启用轮播图
const ISBANNER = bapi + '/appv1/usdpc2/isStartUse'
// 删除轮播图
const DELETEBANNER = bapi + '/appv1/usdpc2/delBanner'
// 上传轮播图
const ADDBANNER = bapi + '/appv1/usdpc2/addBanner'

// ---------------------------个人用户接口---------------------------
// 注册个人账号
const REGISTERUSER = bapi + '/appv1/usdpc2/addBanner'

class Http {
  static common({
    url = '',
    method = 'GET',
    data = {},
    params = {}
    // baseURL = '/api'
  } = {}) {
    return Vue.axios({
      url,
      //   method是请求方法
      method,
      //   baseURL将于url做字符串拼接合并
      // baseURL,
      //   params是get携带的参数
      params,
      //   data是post携带的参数
      data,
      // 设置请求头
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  // 用户登录接口
  static userLogin({ username, password } = {}) {
    return this.common({
      url: LOGIN,
      method: 'POST',
      data: { username, password }
    })
  }

  // ---------------------------新闻接口---------------------------
  // 新闻发布接口
  static sendnews({ uid, title, txt, img, fabu } = {}) {
    return this.common({
      url: SENDNEWS,
      method: 'POST',
      data: { uid, title, txt, img, fabu }
    })
  }
  // 修改新闻接口
  static updatenews({ uid, title, txt, zid, fabu } = {}) {
    return this.common({
      url: UODATENEWS,
      method: 'POST',
      data: { uid, title, txt, zid, fabu }
    })
  }
  // 修改新闻封面接口
  static updatenewspic({ img, zid } = {}) {
    return this.common({
      url: UPDATENEWSPIC,
      method: 'POST',
      data: { img, zid }
    })
  }

  // 删除新闻接口
  static deletenew({ uid, zid } = {}) {
    return this.common({
      url: DELETENEW,
      method: 'POST',
      data: { uid, zid }
    })
  }

  // ---------------------------App接口---------------------------
  // App更新接口
  static appupdate({ uid, type, version, url, des, hezuo } = {}) {
    return this.common({
      url: APPUPDATE,
      method: 'POST',
      data: { uid, type, version, url, des, hezuo }
    })
  }

  // ---------------------------企业接口---------------------------
  // 企业注册登记接口
  static registered({
    uid,
    name,
    zjhao,
    priv,
    shi,
    xian,
    xiang,
    lianxiren,
    lxtel,
    beizhu,
    menlei,
    dalei,
    zhonglei,
    xiaolei
  } = {}) {
    return this.common({
      url: REGISTERED,
      method: 'POST',
      data: {
        uid,
        name,
        zjhao,
        priv,
        shi,
        xian,
        xiang,
        lianxiren,
        lxtel,
        beizhu,
        menlei,
        dalei,
        zhonglei,
        xiaolei
      }
    })
  }

  // 全部企业列表
  static getallcompany({ uid }) {
    return this.common({
      url: ALLCOMPANY,
      method: 'POST',
      data: { uid }
    })
  }

  // 开通企业账号
  static openfunuser({ username, phone, gid, nick } = {}) {
    return this.common({
      url: OPENFUNUSER,
      method: 'POST',
      data: { username, phone, gid, nick }
    })
  }

  // 修改企业基本信息
  static updateqiye({
    uid,
    gid,
    name,
    zjhao,
    menlei,
    dalei,
    zhonglei,
    xiaolei,
    priv,
    shi,
    xian,
    xiang,
    beizhu
  } = {}) {
    return this.common({
      url: UPDATEQIYE,
      method: 'POST',
      data: {
        uid,
        gid,
        name,
        zjhao,
        menlei,
        dalei,
        zhonglei,
        xiaolei,
        priv,
        shi,
        xian,
        xiang,
        beizhu
      }
    })
  }

  // 获取企业,个人用户列表
  static updateuser({ gid, lianxiren, lxtel, uid } = {}) {
    return this.common({
      url: UPDATEUSER,
      method: 'POST',
      data: { gid, lianxiren, lxtel, uid }
    })
  }

  // 获取企业,个人用户列表
  static getlist({ page, type, uid } = {}) {
    return this.common({
      url: GETFIRMLIST,
      method: 'POST',
      data: { page, type, uid }
    })
  }

  // ---------------------------设备接口---------------------------
  // 设备入库
  static puteq({ code, nid, xinghao, guige, jishu, uid, lou } = {}) {
    return this.common({
      url: PUTEQ,
      method: 'POST',
      data: { code, nid, xinghao, guige, jishu, uid, lou }
    })
  }
  // 入库查询
  static geteqlist({ bz, page } = {}) {
    return this.common({
      url: GETEQLIST,
      method: 'POST',
      data: { bz, page }
    })
  }

  // 绑定设备
  static bangeq({ uid, gid, nid } = {}) {
    return this.common({
      url: BANDEQ,
      method: 'POST',
      data: { uid, gid, nid }
    })
  }
  // 解除绑定设备
  static unbangeq({ uid, gid, nid } = {}) {
    return this.common({
      url: UNBANDEQ,
      method: 'POST',
      data: { uid, gid, nid }
    })
  }
  // 绑定设备查询
  static getbandeq({ uid } = {}) {
    return this.common({
      url: GETBANGEQ,
      method: 'POST',
      data: { uid }
    })
  }

  // 删除设备
  static deleteeq({ nid, uid } = {}) {
    return this.common({
      url: DELETEEQ,
      method: 'POST',
      data: { uid, nid }
    })
  }

  // 获取用户列表
  static getuserlist({ type, page } = {}) {
    return this.common({
      url: GETUSERLIST,
      method: 'POST',
      data: { type, page }
    })
  }

  // 检索设备类型
  static geteqtype({ uid, lou, jishu, guige } = {}) {
    return this.common({
      url: GETEQTYPE,
      method: 'POST',
      data: { uid, lou, jishu, guige }
    })
  }

  // 获取新闻列表
  static getnewslist({ page } = {}) {
    return this.common({
      url: GETNEWSLIST,
      method: 'POST',
      data: { page }
    })
  }

  // ---------------------------轮播图接口---------------------------
  // 获取轮播图列表
  static getbannerlist() {
    return this.common({
      url: GETBANNERLIST,
      method: 'POST'
    })
  }
  // 修改轮播图列表
  static updatebanner({ uid, id, name, desc, beizhu, url } = {}) {
    return this.common({
      url: UPDATEBANNER,
      method: 'POST',
      data: { uid, id, name, desc, beizhu, url }
    })
  }

  // 删除轮播图列表
  static deletebanner({ uid, id } = {}) {
    return this.common({
      url: DELETEBANNER,
      method: 'POST',
      data: { uid, id }
    })
  }

  // 是否启用轮播图
  static isbanner({ uid, id, sta } = {}) {
    return this.common({
      url: ISBANNER,
      method: 'POST',
      data: { uid, id, sta }
    })
  }

  // 上传轮播图
  static uploadbanner({ uid, img, name, desc, beizhu, url, status } = {}) {
    return this.common({
      url: ADDBANNER,
      method: 'POST',
      data: { uid, name, img, desc, beizhu, url, status }
    })
  }

  // ---------------------------个人用户接口---------------------------
  // 注册个人账号
  static registeruser({} = {}) {
    return this.common({
      url: REGISTERUSER,
      method: 'POST',
      data: {}
    })
  }
}

export default Http
