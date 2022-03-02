const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
module.exports = {
  publicPath: BASE_URL,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.zyfullstack.top:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
