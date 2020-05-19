const webpack = require('webpack')
module.exports = {
  devServer: {
    proxy: {
      //配置跨域
      '/bapi': {
        target: 'http://a.yumaoyou.cn:8008/index.php/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/bapi': ''
        }
      },
      '/aapi': {
        target: 'http://a.yumaoyou.cn:8008/index.php/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/aapi': ''
        }
      },
      '/capi': {
        target: 'http://a.yumaoyou.cn:8008/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/capi': ''
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
