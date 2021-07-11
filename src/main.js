import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import toast from 'components/common/toast/index';

import bus from './common/bus';
import FastClick from 'fastclick';
//不支持Vue3
// import VueLazyLoad from 'vue-lazyload';

// new Vue({
//   render: h => h(App),
//   router
// }).$mount('#app')

const app = createApp(App);

app.use(store).use(router).mount('#app');

app.config.globalProperties.$bus = bus;

//安装toast
// app.use(toast);
app.config.globalProperties.$toast = toast;

//解决移动端的300ms延迟问题
FastClick.attach(document.body);

//使用懒加载的插件
//不支持Vue3
// app.use(VueLazyLoad);

