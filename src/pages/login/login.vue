<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-13 11:04:54
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-20 10:37:06
 -->
<!--  -->
<template>
  <mycontent title="登录" :isback="true">
    <button
      type="primary"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
      class="login"
    ><image src="../../static/images/weixin.png" style="width:37upx;height:32upx"/>微信登录</button>
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
  loginCode: string = "";
  created() {
    uni.login({
      success: res => {
        this.loginCode = res.code!!;
      }
    });
  }
  async getPhoneNumber(e: any) {
    if (e.detail && e.detail.encryptedData) {
      let dat = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        jsCode: this.loginCode
      };
      let res = await post("/api/public/wechat/auth/registerWechat", dat);
      if (res.success) {
        uni.reLaunch({
          url: "/pages/start/start"
        });
      } else {
        uni.navigateTo({
          url: "/pages/register/register"
        });
      }
    } else {
      uni.navigateTo({
        url: "/pages/register/register"
      });
    }
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.login {
  width: 670upx;
  height: 94upx;
  background: #1AAD19;
  border-radius: 10upx;
  border: 2upx solid rgba(5, 5, 5, 0.08);
  text-align: center;
  font-size: 36upx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  margin-top: 100upx;
  line-height: 94upx;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  image{
    margin-right: 18upx;
  }
}
</style>