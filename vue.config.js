module.exports = {
  devServer: {
    proxy: {
      //配置跨域
      '/bapi': {
        target: 'http://b.yumaoyou.cn:8008/index.php/',
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
      }
    }
  },
  // 禁用eslint检测
  lintOnSave: false
}
