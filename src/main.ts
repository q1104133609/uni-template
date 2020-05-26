/*
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-04-13 13:28:51
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-26 15:25:42
 */

import Vue from 'vue';
import './assets/scss/common.scss';
//引入vuex
import store from './store';
//把vuex定义成全局组件
Vue.prototype.$store = store;
Vue.config.productionTip = false;
import "@/assets/colorui/main.css";
import "@/assets/colorui/icon.css";
const app = new Vue({
	...{
		mpType: 'app',
		globalData: {
			StatusBar: 0,
			CustomBar: 0
		},
		onLaunch() {
			let info = uni.getSystemInfoSync();
			let custom = uni.getMenuButtonBoundingClientRect();
            let that = this as any;
            this.$store.commit('setStatusBar',info.statusBarHeight)
            this.$store.commit('setCustomBar',custom.bottom!! + custom.top!! - info.statusBarHeight!!)
			that.globalData.StatusBar = info.statusBarHeight;
			that.globalData.CustomBar = custom.bottom!! + custom.top!! - info.statusBarHeight!!;
		},
		onShow() {
			console.log('App Show');
		},
		onHide() {
			console.log('App Hide');
		}
	},
	store
});

app.$mount();
