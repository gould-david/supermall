import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

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
