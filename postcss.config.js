module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的是设计稿（iPhone6）的宽度（高清屏，retina ,一个点是两个像素）
      viewportHeight: 667, // 视窗的高度，对应的是设计稿的高度（高清屏，retina ,一个点是两个像素）
      unitPrecision: 5,  //指定px转换成视窗单位值时的小数点位数
      viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
      minPixelValue: 1 , //小于等于1px不转换成视窗单位
      mediaQuery: false , //允许在媒体查询中转换px
      selectorBlackList: ['tab-bar','tab-bar-item','ignore'],
      // ignore 可以根据情况在标签里添加，然后就可以实现不用每次都要在这里增加
      exclude:[/^CartBottom/]
    }
  }
}
