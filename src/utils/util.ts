import { matomuhost } from './../commont/constant';
import { get } from './../plugins/request';
/*
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-03-22 09:45:47
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-16 15:50:54
 */
import { BaseRequest } from '@/plugins/request';
export const setAuth = (auth: string) => {
	uni.setStorageSync('auth', auth);
};

export const setUsername = (auth: string) => {
	uni.setStorageSync('name', auth);
};

export const getUserName = () => {
	let auth = uni.getStorageSync('name');
	return auth ? auth : '';
};

export const getAuth = () => {
	let auth = uni.getStorageSync('auth');
	return auth ? auth : '';
};

//获取微信小程序code
export const getWxCode = () => {
	uni.login({
		provider: 'weixin',
		success: async function(loginRes) {
			let res = await BaseRequest('GET', `wxusers/checkWxUser/${loginRes.code}`);
			res.success && setAuth(res.data);
		}
	});
};

export const sendMatomo = (e_n?: string, e_v?: string) => {
	let uid = getApp().globalData!!.userName
	let requestUrl = `${matomuhost}/matomo/piwik.php?e_c=${e_n ? 'trackEvent' : ''}&e_a=${e_n
		? 'appClick'
		: ''}&e_n=${e_n}&idsite=66&e_v=${e_v}&rec=1&uid=${uid}`;
	uni.request({
		url: requestUrl,
		method: 'GET'
	});
};


export const senJumpMatomo = (action_name: string, url?: string) => {
	let uid = getApp().globalData!!.userName
	let requestUrl = `${matomuhost}/matomo/piwik.php?idsite=66&rec=1&uid=${uid}&url=https:/${url}&action_name=${action_name}`;
	uni.request({
		url: requestUrl,
		method: 'GET'
	});
};

export const timeago = (dateTimeStamp: number) => {
	//dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
	var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
	var hour = minute * 60;
	var day = hour * 24;
	var week = day * 7;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime(); //获取当前时间毫秒
	var diffValue = now - dateTimeStamp; //时间差

	if (diffValue < 0) {
		return;
	}
	var minC = diffValue / minute; //计算时间差的分，时，天，周，月
	var hourC = diffValue / hour;
	var dayC = diffValue / day;
	var weekC = diffValue / week;
	var monthC = diffValue / month;
	let result;
	if (monthC >= 1 && monthC <= 3) {
		result = ' ' + parseInt(`${monthC}`) + '月前';
	} else if (weekC >= 1 && weekC <= 3) {
		result = ' ' + parseInt(weekC.toString()) + '周前';
	} else if (dayC >= 1 && dayC <= 6) {
		result = ' ' + parseInt(dayC.toString()) + '天前';
	} else if (hourC >= 1 && hourC <= 23) {
		result = ' ' + parseInt(hourC.toString()) + '小时前';
	} else if (minC >= 1 && minC <= 59) {
		result = ' ' + parseInt(minC.toString()) + '分钟前';
	} else if (diffValue >= 0 && diffValue <= minute) {
		result = '刚刚';
	} else {
		var datetime = new Date();
		datetime.setTime(dateTimeStamp);
		var Nyear = datetime.getFullYear();
		var Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		var Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
		var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
		var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
		var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
		result = Nyear + '-' + Nmonth + '-' + Ndate;
	}
	return result;
};

export const getAPPInfo = () => {
	return getApp().globalData;
};
