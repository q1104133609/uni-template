/*
 * @Description: 常量
 * @Author: 小白
 * @Date: 2020-02-09 18:25:32
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-20 11:32:13
 */
export const ISDEV = true;
export const host = ISDEV
	? 'https://portal-test.cifi.com.cn/portal-service'
	: 'https://portal-news.cifi.com.cn/portal-service';
export const matomuhost = ISDEV ? 'https://statistics-dev.cifi.com.cn' : 'https://statistics.cifi.com.cn';
