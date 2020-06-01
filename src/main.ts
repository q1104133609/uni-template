/*
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-04-13 13:28:51
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-01 18:46:16
 */

import Vue from 'vue';
import './assets/scss/common.scss';
//引入vuex
import store from './store';
//把vuex定义成全局组件
Vue.prototype.$store = store;
Vue.config.productionTip = false;
import '@/assets/colorui/main.css';
import '@/assets/colorui/icon.css';
const app = new Vue({
	store,
	...{
		mpType: 'app',
		globalData: {},
		onLaunch() {
			let info = uni.getSystemInfoSync();
			if ((info.model || '').indexOf('iPhone XS Max') != -1) {
				this.$store.dispatch('setStatusBarAction', 44);
				this.$store.dispatch('setCustomBarAction', 84);
			} else {
				let custom = uni.getMenuButtonBoundingClientRect();
				this.$store.dispatch('setStatusBarAction', info.statusBarHeight || 44);
				this.$store.dispatch(
					'setCustomBarAction',
					info.statusBarHeight ? custom.bottom!! + custom.top!! - info.statusBarHeight!! : 84
				);
			}
		},
		onShow() {
			console.log('App Show');
		},
		onHide() {
			console.log('App Hide');
		}
	}
});

app.$mount();
