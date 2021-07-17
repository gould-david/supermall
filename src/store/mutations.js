import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default {
  //数量加1
  [ADD_COUNTER](state,payload){
    payload.count += 1
  },
  [ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  }
}
