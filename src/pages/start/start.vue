<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-13 11:04:54
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-01 19:21:24
 -->
<!--  -->
<template>
  <mycontent title="数字旭辉"></mycontent>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import mycontent from "@/components/mycontent.vue";
import myBlock from "@/components/block.vue";
import { post } from "../../plugins/request";
import { setAuth } from "../../utils/util";
@Component({ components: { mycontent, myBlock }, name: "Logn" })
export default class extends Vue {
  async onLoad(data: any) {
    let url = "";
    if (data && data.url) {
      url = decodeURIComponent(data.url);
    }
    this.login(url);
  }
  login(url:string) {
    uni.login({
      success: async res => {
        let { access_token } = await post(
          `/oauth/token?client_id=client2&client_secret=secret&grant_type=password&username=${res.code}`
        );
        if (!access_token) {
          uni.reLaunch({
            url: "/pages/welcome/welcome"
          });
          return;
        }
        setAuth(access_token || "");
        uni.reLaunch({
          url: url || "/pages/index/index"
        });
      },
      fail: () => {
        this.login(url)
      }
    });
  }
  onShareAppMessage(res: any) {
    return {
      title: "数字旭辉",
      path: `/pages/start/start`
    };
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
</style>