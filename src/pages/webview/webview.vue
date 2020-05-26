<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-13 23:40:09
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-26 15:29:17
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
  created() {
    uni.login({
      success: res => {
        this.myUrl = `${this.url}&jsCode=${res.code}&userName=${this.userName}`;
      }
    });
  }
  mounted() {
    if (this.viewAppId)
      post("/api/wechat/view/history/insert", { viewAppId: this.viewAppId });
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