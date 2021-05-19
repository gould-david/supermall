module.exports = {
  configureWebpack: {
    resolve: {
      extensions:[],
      //别名
      alias: {
        /*'@': 'src/',*/
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'nerwork': '@/network',
        'views': '@/views'
      }
    }
  }
}