import { setAuth, getAPPInfo } from './../utils/util';
/*
 * @Description: file content
 * @Author: 小白
 * @Date: 2020-02-09 15:16:22
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-01 10:02:35
 */
import { getAuth } from '@/utils/util';
import { host } from '@/commont/constant';
export const get = (url: string, data?: string | object | ArrayBuffer) => BaseRequest('GET', url, data);
export const post = (url: string, data?: string | object | ArrayBuffer) => BaseRequest('POST', url, data);
export const put = (url: string, data?: string | object | ArrayBuffer) => BaseRequest('PUT', url, data);
export const BaseRequest = (
	method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
	url: string,
	data?: string | object | ArrayBuffer
) => {
	uni.showLoading({ title: '加载中...', mask: true });
	let header: any = {
		'Content-type': 'application/json;charset=utf-8',
		...getAPPInfo()
	};
	if (getAuth()) {
		header.Authorization = `Bearer ${getAuth()}`;
	}

	return new Promise<any>((resolve, reject) => {
		uni.request({
			url: `${host}${url}`,
			data,
			method: method,
			header,
			success: (res: any) => {
				uni.hideLoading();
				if(res.statusCode === 401){
					uni.reLaunch({
						url:"/pages/start/start"
					})
					reject(res)
					return
				}
				!res.data.success &&
					res.data.message &&
					uni.showToast({
						icon: 'none',
						title: res.data.message
					});

				resolve(res.data);
			},
			fail: (error) => {
				console.log(error);
				uni.hideLoading();
				reject(error);
			}
		});
	});
};
