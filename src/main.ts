/*
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-04-13 13:28:51
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-06 18:15:05
 */

import Vue from 'vue';
import './assets/scss/common.scss';
//引入vuex
import store from './store';
//把vuex定义成全局组件
Vue.prototype.$store = store;
Vue.config.productionTip = false;
import App from './App.vue';
import '@/assets/colorui/main.css';
import '@/assets/colorui/icon.css';

new App({ store }).$mount();
