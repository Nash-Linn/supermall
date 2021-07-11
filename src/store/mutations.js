import {
  ADD_COUNTER,
  ADD_TO_CART
}from './mutations-types'


export default {
  //mutations 唯一的目的就是修改state中状态
  //mutations中的每一个方法尽可能完成的事件比较单一
  //addCart 中有的 if 相当于做了两件事, 所以将addCart放入 actions 中
  // addCart(state, payload){
  //   //法一 for 循环
  //   // let oldProcuct = null;
  //   // for(let item of state.cartList){
  //   //   if(item.iid === payload.iid){
  //   //     oldProcuct = item;
  //   //   }
  //   // }
  //   //法二 find 
  //   let oldProcuct = state.cartList.find(item => item.iid === payload.iid)
  //   //判断oldProcuct
  //   if(oldProcuct){
  //     oldProcuct.count += 1;
  //   }else{
  //     payload.count = 1; 
  //     state.cartList.push(payload)
  //   }
  // }
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload);
  }


}