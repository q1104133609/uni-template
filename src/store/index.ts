/*
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-26 14:08:06
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-26 15:25:56
 */

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		StatusBar: 0,
		CustomBar: 0
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
        setStatusBar({commit,state}, StatusBar){
            commit("setStatusBar", StatusBar);
        },
        setCustomBar({commit,state}, CustomBar){
            // 跟后台打交道
            // 调用mutaions里面的方法
            commit("setCustomBar", CustomBar);
        },
    }
});
export default store;
