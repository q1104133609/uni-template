<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-13 11:04:54
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-06 19:28:49
 -->
<!--  -->
<template>
  <mycontent title="数字旭辉"></mycontent>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import mycontent from "@/components/mycontent.vue";
import { post } from "../../plugins/request";
import { setAuth } from "../../utils/util";
@Component({ components: { mycontent }, name: "Logn" })
export default class extends Vue {
  async onLoad(data: any) {
    let url = "";
    if (data.q) {
      let qrUrl = decodeURIComponent(data.q);
      var tempId = this.getQueryString(qrUrl, "url") || "";
      url = decodeURIComponent(tempId);
    }
    if (data && data.url) {
      url = decodeURIComponent(data.url);
    }
    this.login(url);
  }
  /**
   * 获取小程序二维码参数
   * @param {String} scene 需要转换的参数字符串
   */
  getQueryString(url: string, name: string) {
    var reg = new RegExp("(^|&|/?)" + name + "=([^&|/?]*)(&|/?|$)", "i");
    var r = url.substr(1).match(reg);
    if (r != null) {
      return r[2];
    }
    return null;
  }
  login(url: string) {
    uni.login({
      success: async res => {
        let { access_token } = await post(
          `/oauth/token?client_id=client2&client_secret=secret&grant_type=password&username=${res.code}`
        );
        uni.reLaunch({
          url: url || "/pages/index/index"
        });
      },
      fail: () => {
        this.login(url);
      }
    });
  }
  onShareAppMessage(res: any) {
    return {
      path: `/pages/start/start`
    };
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
</style>