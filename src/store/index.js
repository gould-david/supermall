import Vue from 'vue'
import Vuex from 'vuex'
//1.安装插件
Vue.use(Vuex)
//2.创建Store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
      // 添加购物车时，需要判断此商品是否已经在购物车内.通过iid进行判断
      if(state.cartList.length > 0){
        for (let item of state.cartList){
          if(item.iid === payload.iid){
            item.count++
          }
          else{
            payload.count = 1
            state.cartList.push(payload)
          }
        }
      }
      else {
        state.cartList.push(payload)
      }
    }
  }
})

//3.挂载到Vue实例上
export default store
