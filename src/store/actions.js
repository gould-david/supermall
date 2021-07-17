import {ADD_TO_CART,ADD_COUNTER} from "./mutations-types";

export default {
  addCart(context,payload){
    // 添加购物车时，需要判断此商品是否已经在购物车内.通过iid进行判断
    let oldProduct = null;
    for (let item of context.state.cartList){
      if(item.iid === payload.iid){
        oldProduct = item
      }
    }
    if(oldProduct){
      context.commit(ADD_COUNTER,oldProduct)
    }
    else{
      payload.count = 1
      context.commit(ADD_TO_CART,payload)
    }
  }
}
