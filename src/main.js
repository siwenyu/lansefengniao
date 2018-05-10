/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'


import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '@/assets/bootstrap/dist/css/bootstrap.css'
import '@/assets/css/normal.css'

import '@/assets/css/v-verify.css'

import '@/assets/css/page.css'

import 'babel-polyfill'

require("es6-promise").polyfill();
require('isomorphic-fetch');

Vue.use(iView);

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index);
}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
  	template: '<App/>',
  	components: { App, alert }
})
