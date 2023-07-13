/* eslint-disable */
module.exports = {
  productionSourceMap: false, // 生产环境禁用
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
