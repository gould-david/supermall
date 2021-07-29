import {ADD_COUNTER,ADD_TO_CART,UPDATECHECK} from "./mutations-types";

export default {
  //数量加1
  [ADD_COUNTER](state,payload){
    payload.count += 1
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  },
  [UPDATECHECK](state,payload){
    console.log(payload);
    payload.checked = !payload.checked
  }
}
