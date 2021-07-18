import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vant css，js文件的引入
import 'vant/lib/index.css';
import 'vant/lib/index.js';
import 'vant/lib/vant.js';

// vant组件的引入
import { Icon } from 'vant';
Vue.use(Icon);

import { Form } from 'vant';
import { Field } from 'vant';

Vue.use(Form);
Vue.use(Field);

import { Cascader } from 'vant';
Vue.use(Cascader);

import { Area } from 'vant';
Vue.use(Area);

import { Popup } from 'vant';
Vue.use(Popup);

import { Calendar } from 'vant';
Vue.use(Calendar);

import { Cell } from 'vant';
Vue.use(Cell);

import { Button } from 'vant';
Vue.use(Button);

import { Toast } from 'vant';
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
