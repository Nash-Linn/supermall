import ToastComponent  from './Toast'

// 由于vue3取消了extend，所以如果想获取组件的$el需要换个写法

// const obj = {

// }

// obj.install = function (Vue) {  
//   // console.log('执行了obj的install函数',Vue);
//   // document.body.appendChild(Toast.$el);  //不生效

//   //1.创建组件构造器
//   const toastConstructor = Vue.extend(Toast);

//   //2.new的方式, 根据组件构造器, 可以创建出来一个组件对象
//   const toast = new toastConstructor;

//   //3.将组件对象, 手动挂载到某一个元素上
//   toast.$mount(document.createElement('div'))

//   //4.toast.$el 对应的就是div
//   document.body.appendChild(toast.$el)
//   Vue.prototype.$toast = Toast;
// }

// export default obj;

import { createApp } from "vue";
let instance;
const toast = function(text) {
  if (instance) {
    instance.text = text;
    instance.show();
    return;
  }
  instance = createApp(ToastComponent).mount(document.createElement("div"));
  instance.text = text;
  document.body.appendChild(instance.$el);
};

export default toast;

