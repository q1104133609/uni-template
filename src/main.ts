/*
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-04-13 13:28:51
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-03 09:34:50
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
			let model = info.model || '';
			if (model.search('iPhone X') != -1 || model.search('iPhone 11') != -1) {
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
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					console.log('onCheckForUpdate====', res);
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						console.log('res.hasUpdate====');
						updateManager.onUpdateReady(function() {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									console.log('success====', res);
									// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							uni.showModal({
								title: '已经有新版本了哟',
								content: '新版本已经上线啦，请您删除当前小程序，重新搜索打开哟'
							});
						});
					}
				});
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
