import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vant css，js文件的引入
import 'vant/lib/index.css';
import 'vant/lib/index.js';
import 'vant/lib/vant.js';

// vant组件的引入
import { Icon,Form,Field,Cascader,Area,Popup,Calendar,Cell,Button,Toast } from 'vant';
Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.use(Cascader);
Vue.use(Area);
Vue.use(Popup);
Vue.use(Calendar);
Vue.use(Cell);
Vue.use(Button);
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
