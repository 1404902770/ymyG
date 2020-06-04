import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/user/Home'
// import login from '../views/login.vue'
import account from '../views/user/account.vue'
import funuser from '../views/user/funuser.vue'
import puteq from '../views/EQ/putEq.vue'
import eqman from '../views/EQ/eqMan.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 用户管理路由
  {
    path: '/funuser',
    // name: 'Home',
    component: Home,
    children: [
      // 企业注册路由
      {
        path: '/account',
        name: 'Account',
        component: account,
        meta: {
          title: '企业注册'
        }
      },
      {
        // 企业账号列表路由
        path: '/funuser',
        name: 'Funuser',
        component: funuser,
        meta: {
          title: '企业账号'
        }
      },
      {
        // 开通企业账号路由
        path: '/openfunuser',
        name: 'openfunuser',
        component: resolve =>
          require(['@/views/user/openfunuser.vue'], resolve),
        meta: {
          title: '开通企业账号'
        }
      },
      {
        // 账号列表路由
        path: '/zhanghaolist',
        name: 'zhanghaolist',
        component: resolve =>
          require(['@/views/user/zhanghaolist.vue'], resolve),
        meta: {
          title: '账号列表'
        }
      },
      {
        // 个人账号列表路由
        path: '/userfunlist',
        name: 'userfunlist',
        component: resolve =>
          require(['@/views/user/userfunlist.vue'], resolve),
        meta: {
          title: '个人账号'
        }
      },
      {
        // 添加个人账号路由
        path: '/adduser',
        name: 'adduser',
        component: resolve => require(['@/views/user/adduser.vue'], resolve),
        meta: {
          title: '添加个人账号'
        }
      }
    ]
  },

  // 设备管理路由
  {
    path: '/eqman',
    // name: 'Equipment',
    component: resolve => require(['@/views/EQ/equipment.vue'], resolve),
    children: [
      {
        // 设备入库路由
        path: '/puteq',
        name: 'Puteq',
        component: puteq,
        meta: {
          title: '设备入库'
        }
      },
      {
        // 设备管理路由
        path: '/eqman',
        name: 'Eqman',
        component: eqman,
        meta: {
          title: '设备管理'
        }
      }
    ]
  },

  // App设置路由
  {
    path: '/appset',
    name: 'Appset',
    component: resolve => require(['@/views/app/appset.vue'], resolve),
    children: [
      // App版本列表
      {
        path: '/appset',
        name: 'setapp',
        component: resolve => require(['@/views/app/setapp.vue'], resolve),
        meta: {
          title: 'App版本更新'
        }
      },
      // App版本更新
      {
        path: '/applist',
        name: 'applist',
        component: resolve => require(['@/views/app/applist.vue'], resolve),
        meta: {
          title: 'App版本列表'
        }
      },
      // 发布公告
      {
        path: '/sendnotice',
        name: 'sendnotice',
        component: resolve => require(['@/views/app/sendNotice.vue'], resolve),
        meta: {
          title: '发布公告'
        }
      },
      // 公告列表
      {
        path: '/noticelist',
        name: 'noticelist',
        component: resolve => require(['@/views/app/noticeList.vue'], resolve),
        meta: {
          title: '公告列表'
        }
      },
      // 更新轮播图
      {
        path: '/updatebanner',
        name: 'updatebanner',
        component: resolve =>
          require(['@/views/app/updateBanner.vue'], resolve),
        meta: {
          title: '更新轮播图'
        }
      },
      // 轮播图列表
      {
        path: '/bannerlist',
        name: 'bannerlist',
        component: resolve => require(['@/views/app/bannerList.vue'], resolve),
        meta: {
          title: '轮播图列表'
        }
      },
      // 发布新闻
      {
        path: '/sendnews',
        name: 'sendnews',
        component: resolve => require(['@/views/app/sendNews.vue'], resolve),
        meta: {
          title: '发布新闻'
        }
      },
      // 新闻列表
      {
        path: '/newslist',
        name: 'newslist',
        component: resolve => require(['@/views/app/newsList.vue'], resolve),
        meta: {
          title: '新闻列表'
        }
      }
    ]
  },

  // 官网设置路由
  {
    path: '/newstype',
    // name: 'Equipment',
    component: resolve => require(['@/views/website/newshome.vue'], resolve),
    children: [
      // 新闻类型
      {
        path: '/newstype',
        name: 'newstype',
        component: resolve =>
          require(['@/views/website/newstype.vue'], resolve),
        meta: {
          title: '新闻类型'
        }
      },
      // 官网新闻列表
      {
        path: '/webnewslist',
        name: 'webnewslist',
        component: resolve =>
          require(['@/views/website/webnewslist.vue'], resolve),
        meta: {
          title: '新闻列表'
        }
      },
      // 官网留言列表
      {
        path: '/leavemessage',
        name: 'leavemessage',
        component: resolve =>
          require(['@/views/website/leavemessage.vue'], resolve),
        meta: {
          title: '留言列表'
        }
      },
      // 官网招贤纳士
      {
        path: '/recruiting',
        name: 'recruiting',
        component: resolve =>
          require(['@/views/website/recruiting.vue'], resolve),
        meta: {
          title: '招贤纳士'
        }
      }
    ]
  },

  // {
  //   path: '/demo',
  //   name: 'demo',
  //   component: resolve => require(['@/views/demo.vue'], resolve)
  // },

  // 登陆路由
  {
    path: '/',
    name: 'Login',
    component: resolve => require(['@/views/login.vue'], resolve)
  },
  // 首页路由
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/views/index.vue'], resolve)
  }

  // {
  //   path: '/upload1',
  //   name: 'upload1',
  //   component: resolve => require(['@/components/upload1.vue'], resolve)
  // },
  // {
  //   path: '/upload',
  //   name: 'upload',
  //   component: resolve => require(['@/components/upload.vue'], resolve)
  // },

  // {
  //   path: '/aaa',
  //   name: 'aaa',
  //   component: resolve => require(['@/components/aaa.vue'], resolve)
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (to.meta.title) {
    document.title = to.meta.title + ' - 云控管理平台'
  } else {
    document.title = '云控管理平台'
  }
  next()
})

export default router
