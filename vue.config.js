//用于配置别名


module.exports = {
  configureWebpack:{
    //解决一些路径别名  省略后缀等问题
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    },
  },
  
}