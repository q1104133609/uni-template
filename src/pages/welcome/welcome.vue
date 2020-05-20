<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-13 11:04:54
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-20 10:25:47
 -->
<!--  -->
<template>
  <mycontent title="数字旭辉">
    <div class="column" style="padding-top:110upx">
      <div class="big_Text">
        你好！
        <br />欢迎进入数字旭辉
      </div>
      <div
        style="margin-top:41upx;color:rgba(255,255,255,0.6);font-size:28upx;line-height:38upx;"
      >数字旭辉是为旭辉集团企业内部员工提供的一站式线上办公平台，仅限内部员工进行日常线上办公。</div>
      <div class="row_between" style="margin-top:60upx">
        <div v-for="item in items" :key="item.title" class="column_center">
          <image :src="item.url" style="height:64upx;width:64upx;margin-bottom:11upx" />
          <text
            style="font-size:24upx;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(255,255,255,1);
line-height:33upx;"
          >{{ item.title}}</text>
        </div>
      </div>
      <div class="join" @click="toLogin">进入系统</div>
    </div>
  </mycontent>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import mycontent from "@/components/mycontent.vue";
import myBlock from "@/components/block.vue";
import { post } from "../../plugins/request";
import { setAuth } from "../../utils/util";
@Component({ components: { mycontent, myBlock }, name: "Logn" })
export default class extends Vue {
  items = [
    { title: "报表查看", url: "../../static/images/look.png" },
    { title: "流程审批", url: "../../static/images/process.png" },
    { title: "新闻阅读", url: "../../static/images/news_logo.png" },
    { title: "更多", url: "../../static/images/more.png" }
  ];
  toLogin() {
    setAuth("");
    uni.navigateTo({
      url: "/pages/login/login"
    });
  }
}
</script>
<style lang='scss' scoped>
.join {
  width: 100%;
  height: 94upx;
  background: rgba(255, 255, 255, 0);
  border-radius: 16upx;
  border: 1upx solid rgba(255, 255, 255, 1);
  font-size: 36upx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 94upx;
  text-align: center;
  margin-top: 101upx;
}
</style>