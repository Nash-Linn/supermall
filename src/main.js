import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import toast from 'components/common/toast/index'

import bus from './common/bus';

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
