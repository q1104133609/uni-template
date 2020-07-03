/*
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-26 14:08:06
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-03 09:37:53
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
			state.StatusBar = StatusBar;
		},
		setCustomBar(state, CustomBar) {
			state.CustomBar = CustomBar;
		}
	},
	actions: {
		setStatusBarAction({ commit, state }, StatusBar) {
			commit('setStatusBar', StatusBar);
		},
		setCustomBarAction({ commit, state }, CustomBar) {
			// 跟后台打交道
			// 调用mutaions里面的方法
			commit('setCustomBar', CustomBar);
		}
	}
});
export default store;
