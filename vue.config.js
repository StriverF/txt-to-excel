
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            /* less 变量覆盖，用于自定义 ant design 主题 */
            'border-radius-base': '4px'
          }
        },
        javascriptEnabled: true
      }
    }
  }
}
