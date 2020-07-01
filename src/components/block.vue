<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-12 22:45:32
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-01 09:54:16
 -->
<!--  -->
<template>
  <div class="blcokc row_between" @click="toWebView">
    <div>
      <div>{{title}}</div>
      <div class="desc">{{content}}</div>
    </div>
    <image src="../static/images/black_arrow.png" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { post } from "../plugins/request";
@Component({ components: {}, name: "Block" })
export default class extends Vue {
  @Prop({ default: "" })
  private title!: string;
  @Prop({ default: 0 })
  private viewAppId!: number;
  @Prop({ default: "" })
  private content!: string;
  @Prop({ default: "" })
  private url!: string;
  @Prop({ default: "" })
  private voiceHistoryContent!: string;
  @Prop({ default: "" })
  private voiceContentId!: string;
  toWebView() {
    if (this.url) {
      getApp().globalData!.url = this.url;
      getApp().globalData!.title = this.title;
      getApp().globalData!.viewAppId = this.viewAppId;
      post("/api/wechat/view/history/insert", {
        viewAppId: this.viewAppId,
        voiceContentId:this.voiceContentId
      });
   
      uni.navigateTo({
        url: "/pages/webview/webview"
      });
    }
  }
}
</script>
<style lang='scss' scoped>
.blcokc {
  padding: 20upx 40upx;
  background: rgba(255, 255, 255, 0.81);
  border-radius: 16upx;
  border: 1upx solid rgba(151, 151, 151, 1);
  margin-top: 24upx;
  font-size: 68upx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 95upx;
  .desc {
    font-size: 37upx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 52upx;
    margin-top: 3upx;
  }
  image {
    height: 22upx;
    width: 12upx;
  }
}
</style>