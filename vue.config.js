const webpack = require('webpack')
module.exports = {
  devServer: {
    proxy: {
      //配置跨域
      '/bapi': {
        target: 'http://api.yumaoyou.cn/index.php/api/admin/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/bapi': ''
        }
      },
      '/aapi': {
        target: 'http://api.yumaoyou.cn/index.php/api/admin/',
        // target: 'http://a.yumaoyou.cn:8008/index.php/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/aapi': ''
        }
      },
      '/capi': {
        target: 'http://api.yumaoyou.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/capi': ''
        }
      },
      '/b': {
        target: 'http://b.yumaoyou.cn/index.php',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/b': ''
        }
      },
      '/api': {
        target: 'http://api.yumaoyou.cn/index.php',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 禁用eslint检测
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      // 支持 jquery
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  }
}
