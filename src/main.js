import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from 'components/common/toast'
import fastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300ms延迟问题
fastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyload,{
  // 在未加载时显示的图片
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

/*

const debounce = function(func,delay){
  let timer = null;
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      console.log('间隔器')
      func.apply(this,args)
    },delay)
  }
}
const func = function(){
  console.log('被执行函数')
}
const a = debounce(func,2000)
a()
a()
a()
a()
a()
*/
