<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-13 18:04:23
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-03 14:29:25
 -->
<!--  -->
<template>
  <view
    @longpress="touchstart"
    @touchend.stop="$emit('endRecord')"
    @touchcancel.stop="$emit('endRecord')"
    class="myccc"
  >
    <view class="recode">
      <view class="ripple" :animation="spreakingAnimation1" v-if="isRecord"></view>
      <view class="ripple" :animation="spreakingAnimation2" v-if="isRecord">></view>
      <view class="ripple" :animation="spreakingAnimation3" v-if="isRecord">></view>
      <view class="loading_view" v-if="showLoading">
        <div class="loader-15"></div>
      </view>
      <image
        :src="isRecord?'../static/images/video1.png':'../static/images/video.png'"
        style="width:100%;height:100%;"
         v-if="!showLoading"
      />
    </view>
  </view>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({ components: {}, name: "Rocode" })
export default class Rocode extends Vue {
  animation2: any = null;
  animation1: any = null;
  animation3: any = null;
  spreakingAnimation1: any = null;
  spreakingAnimation2: any = null;
  spreakingAnimation3: any = null;
  @Prop({
    default: false
  })
  private isRecord!: boolean;
   @Prop({
    default: false
  })
  private showLoading!: boolean;
  onReady() {
    this.animation1 = uni.createAnimation({
      duration: 1000,
      timingFunction: "ease-out"
    });
    this.animation2 = uni.createAnimation({
      duration: 1000,
      timingFunction: "ease-out"
    });
    this.animation3 = uni.createAnimation({
      duration: 1000,
      timingFunction: "ease-out"
    });
  }
  @Watch("isRecord")
  watchRecord() {
    if (this.isRecord) {
      this.speaking();
    }
  }

  async touchstart() {
    if (await this.checkPrimisse()) {
      this.$emit("startRecord");
    }
  }
  //检查权限
  checkPrimisse() {
    return new Promise(resolve => {
      uni.getSetting({
        success(res) {
          if (!res.authSetting["scope.record"]) {
            //调取小程序新版授权页面
            uni.authorize({
              scope: "scope.record",
              success() {
                console.log("录音授权成功");
                resolve(false);
                // 用户已经同意小程序使用录音功能
              },
              fail() {
                console.log("第一次录音授权失败");
                uni.showModal({
                  title: "提示",
                  content: "您未授权录音，功能将无法使用",
                  showCancel: true,
                  confirmText: "授权",
                  confirmColor: "#52a2d8",
                  success: function(res: any) {
                    if (res.confirm) {
                      //确认则打开设置页面（重点）

                      uni.openSetting({
                        success: uni => {
                          console.log(res.authSetting);
                          if (!res.authSetting["scope.record"]) {
                            console.log("未设置录音授权");
                            uni.showModal({
                              title: "提示",
                              content: "您未授权录音，功能将无法使用",
                              showCancel: false
                            });
                          } else {
                            //第二次才成功授权
                            console.log("设置录音授权成功");
                            resolve(false);
                          }
                        },

                        fail: function() {
                          resolve(false);
                          console.log("授权设置录音失败");
                        }
                      });
                    } else if (res.cancel) {
                      resolve(false);
                      console.log("cancel");
                    }
                  },

                  fail: function() {
                    console.log("openfail");
                    resolve(false);
                  }
                });
              }
            });
          } else {
            resolve(true);
          }
        }
      });
    });
  }
  speaking() {
    //波纹放大,淡出动画
    var _this = this;
    setTimeout(() => {
      this.animationFun(1, 1000);
    }, 0);
    setTimeout(() => {
      this.animationFun(2, 1000);
    }, 300);
    setTimeout(() => {
      this.animationFun(3, 1000);
    }, 600);
  }
  animationFun(index: number, time: any) {
    //波纹放大,淡出动画
    if (this.isRecord) {
      setTimeout(() => {
        this.animationFun(index, time);
      }, time);
    }
    switch (index) {
      case 1:
        this.animation1
          .scale(1, 1)
          .opacity(1)
          .step({ duration: 0 }); //还原
        this.spreakingAnimation1 = this.animation1.export();
        break;
      case 2:
        this.animation2
          .scale(1, 1)
          .opacity(1)
          .step({ duration: 0 }); //还原
        this.spreakingAnimation2 = this.animation2.export();
        break;
      case 3:
        this.animation3
          .scale(1, 1)
          .opacity(1)
          .step({ duration: 0 }); //还原
        this.spreakingAnimation3 = this.animation3.export();
        break;
    }
    setTimeout(() => {
      switch (index) {
        case 1:
          this.animation1
            .scale(2, 2)
            .opacity(0)
            .step(); //修改透明度,放大
          this.spreakingAnimation1 = this.animation1.export();
          break;
        case 2:
          this.animation2
            .scale(2, 2)
            .opacity(0)
            .step(); //修改透明度,放大
          this.spreakingAnimation2 = this.animation2.export();
          break;
        case 3:
          this.animation3
            .scale(2, 2)
            .opacity(0)
            .step(); //修改透明度,放大
          this.spreakingAnimation3 = this.animation3.export();
          break;
      }
    }, 100);
  }
}
</script>
<style lang='scss' scoped>
/* pages/myRecode/myRecode.wxss */
.myccc {
  width: 276rpx;
  height: 156rpx;
  padding: 0rpx 60rpx;
  text-align: center;
}
.recode {
  display: inline-block;
  width: 156rpx;
  height: 156rpx;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  line-height: 156rpx;
  position: relative;
}
.ripple {
  position: absolute;
  border-radius: 100%;
  border: 4upx dotted #4ef2ff;
  width: 100%;
  height: 100%;
}
.loading_view {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  border:2upx solid #fff;
  border-radius: 100%;
  margin: 10upx;
  box-sizing: border-box;
  overflow: hidden;
}
.loader-15 {
  background: #fff;
  position: relative;
  -webkit-animation: loader-15 1s ease-in-out infinite;
  animation: loader-15 1s ease-in-out infinite;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
  width: 0.25em;
  height: 1em;
 
}
.loader-15:after,
.loader-15:before {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
  background: #fff;
  -webkit-animation: inherit;
  animation: inherit;
}
.loader-15:before {
  right: 0.5em;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.loader-15:after {
  left: 0.5em;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
@-webkit-keyframes loader-15 {
  0%,
  100% {
    box-shadow: 0 0 0 #fff, 0 0 0 #fff;
  }
  50% {
    box-shadow: 0 -0.25em 0 #fff, 0 0.25em 0 #fff;
  }
}
@keyframes loader-15 {
  0%,
  100% {
    box-shadow: 0 0 0 #fff, 0 0 0 #fff;
  }
  50% {
    box-shadow: 0 -0.25em 0 #fff, 0 0.25em 0 #fff;
  }
}
</style>