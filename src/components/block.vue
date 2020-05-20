<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-12 22:45:32
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-16 10:25:31
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
  toWebView() {
    if (this.url) {
      getApp().globalData!.url = this.url;
      getApp().globalData!.title = this.title;
      getApp().globalData!.viewAppId = this.viewAppId;
      console.log( getApp().globalData!.viewAppId)
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