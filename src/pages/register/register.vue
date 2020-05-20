<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-13 11:04:54
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-20 10:31:03
 -->
<!--  -->
<template>
  <mycontent title="登录" :isback="true">
    <div class="row_center muitem" style="margin-top:100upx">
      <div>数字旭辉登录</div>
      <div
        style="flex:1;font-size:20upx;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(255,255,255,0.6);margin-left:12upx"
      >(用户名密码与OA相同)</div>
    </div>
    <div class="row_center muitem">
      <image src="../../static/images/user.png" style="width:28upx;height:30upx" />
      <input
        style="flex:1;margin-left:22upx;font-size:28upx"
        placeholder="请输入账号"
        placeholder-style="color:rgba(255,255,255,0.6);"
        v-model="user"
      />
    </div>
    <div class="row_center muitem">
      <image src="../../static/images/pwd.png" style="width:24upx;height:30upx" />
      <input
        style="flex:1;margin-left:22upx;font-size:28upx"
        placeholder="请输入密码"
        placeholder-style="color:rgba(255,255,255,0.6);"
        type="password"
        v-model="pwd"
      />
    </div>
    <button class="login my" @click="register">登录</button>
    <button class="login" @click="login">微信登录</button>
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
  user = "";
  pwd = "";
  async register() {
    if (!this.user) {
      uni.showToast({
        title: "请输入账号",
        icon: "none"
      });
      return;
    }
    if (!this.pwd) {
      uni.showToast({
        title: "请输入密码",
        icon: "none"
      });
      return;
    }
    let { access_token } = await post(
      `/oauth/token?client_id=wechat&client_secret=44d800d5-bbea-489a-920d-d4940909ce3f&grant_type=password&username=${this.user}&password=${this.pwd}`
    );
    if (!access_token) {
      uni.showToast({
        title: "登录失败，请重试",
        icon: "none"
      });
      return;
    } else {
      setAuth(access_token || "");
      uni.reLaunch({
        url: "/pages/index/index"
      });
    }
  }
  login() {
    uni.navigateBack()
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.muitem {
  width: 100%;
  padding: 32upx 0upx;
  font-size: 28upx;
  border-bottom: rgba(255, 255, 255, 0.3) solid 1upx;
  color: #fff;
}
.login {
  width: 679upx;
  height: 80upx;
  background: #1AAD19;
  border-radius: 40upx;
  text-align: center;
  font-size: 28upx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  margin-top: 30upx;
  line-height: 80upx;
}
.my {
  background: rgba(216, 216, 216, 0);
  border: 2upx solid rgba(255, 255, 255, 1);
  color: rgba(255, 255, 255, 1);
}
</style>