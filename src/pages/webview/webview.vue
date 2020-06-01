<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-13 23:40:09
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-01 19:30:19
 -->
<!--  -->
<template>
  <div style="width:100vw;background:#21212B;min-height:100vh">
    <cu-custom :isback="true" bgcolor="#272733">
      <block slot="content">{{title}}</block>
    </cu-custom>
    <web-view :src="myUrl" :webview-styles="webviewStyles">
      <!-- <cover-image src="../../static/images/voiceright.png" class="myImages"/> -->
    </web-view>
  </div>
</template>

<script lang='ts'>
import cuCustom from "@/assets/colorui/components/cu-custom.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { post, get } from "../../plugins/request";
import { State } from "vuex-class";
@Component({ components: { cuCustom }, name: "WebView" })
export default class WebView extends Vue {
  @State CustomBar!: number;
  @State StatusBar!: number;
  url = getApp().globalData!!.url;
  viewAppId = getApp().globalData!!.viewAppId;
  title = getApp().globalData!!.title;
  userName = getApp().globalData!!.userName;
  myUrl = "";
  from = "common";
  async onLoad(data: any) {
    if (data && data.params) {
      console.log("onload", JSON.parse(decodeURIComponent(data.params)));
      let params = JSON.parse(decodeURIComponent(data.params));
      let res = await get("/api/wechat/init/info/query");
      this.url = params.url;
      this.viewAppId = params.viewAppId;
      this.title = params.title;
      this.userName = res.employeeInfo.userName;
      this.from = "share";
    }
    uni.login({
      success: res => {
        this.myUrl = `${this.url}&jsCode=${res.code}&userName=${this.userName}&from=${this.from}`;
      }
    });
    if (this.viewAppId)
      post("/api/wechat/view/history/insert", { viewAppId: this.viewAppId });
  }

  onShareAppMessage(res: any) {
    let jumpParams = {
      title: getApp().globalData!!.title,
      viewAppId: getApp().globalData!!.viewAppId,
      url: getApp().globalData!!.url
    };
    return {
      title: this.title,
      imageUrl: "../../static/images/share.png",
      path: `/pages/start/start?url=${encodeURIComponent(
        `/pages/webview/webview?params=${encodeURIComponent(
          JSON.stringify(jumpParams)
        )}`
      )}`
    };
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.myImages {
  height: 92upx;
  position: fixed;
  z-index: 3;
  right: 0upx;
  top: 40upx;
}
</style>