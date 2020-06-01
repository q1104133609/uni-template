/*
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-26 14:08:06
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-01 18:47:36
 */

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		StatusBar: 20,
		CustomBar: 60
	},
	mutations: {
		setStatusBar(state, StatusBar) {
			console.log('StatusBar1', StatusBar);
			state.StatusBar = StatusBar;
		},
		setCustomBar(state, CustomBar) {
			console.log('CustomBar1', CustomBar);
			state.CustomBar = CustomBar;
		}
	},
	actions: {
		setStatusBarAction({ commit, state }, StatusBar) {
			console.log('StatusBar', StatusBar);
			commit('setStatusBar', StatusBar);
		},
		setCustomBarAction({ commit, state }, CustomBar) {
			// 跟后台打交道
			// 调用mutaions里面的方法
			console.log('CustomBar', CustomBar);
			commit('setCustomBar', CustomBar);
		}
	}
});
export default store;
