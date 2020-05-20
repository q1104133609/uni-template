<!--
 * @Description: file content
 * @Author: 小白
 * @Date: 2019-09-17 02:03:28
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-20 10:46:08
 -->
<template>
  <view>
    <view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
      <view
        class="cu-bar fixed text-white"
        :style="style"
      >
        <view class="action" @tap="BackPage" v-if="isback">
          <text class="cuIcon-back" style="color:#9397AA"></text>
          <slot name="backText"></slot>
        </view>
        <slot name="left"></slot>
        <view class="content" :style="[{top:StatusBar + 'px'}]">
          <slot name="content"></slot>
        </view>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { get } from "../../../plugins/request";
@Component({
  name: "cu-custom"
})
export default class CuCustom extends Vue {
  StatusBar = getApp().globalData!.StatusBar;
  CustomBar = getApp().globalData!.CustomBar;
  @Prop({
    type: [Boolean, String],
    default: false
  })
  private isback!: [Boolean, String];
  @Prop({
    type: String,
    default: "transparent"
  })
  private bgColor!: string;
  get style() {
    var StatusBar = getApp().globalData!.StatusBar;
    var CustomBar = getApp().globalData!.CustomBar;
    var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
    if (this.bgColor) {
      style = `${style}background:${this.bgColor}`;
    }
    return style;
  }

  BackPage() {
    this.$emit('back')
    uni.navigateBack({
      delta: 1
    });
  }
}
</script>

<style>
</style>
