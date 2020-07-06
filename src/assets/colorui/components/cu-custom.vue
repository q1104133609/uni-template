<!--
 * @Description: file content
 * @Author: 小白
 * @Date: 2019-09-17 02:03:28
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-06 19:31:38
 -->
<template>
  <view>
    <view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
      <view class="cu-bar fixed text-white" :style="style">
        <view class="action" @tap="BackPage" v-if="isback">
          <text class="cuIcon-back" style="color:#9397AA"></text>
          <slot name="backText"></slot>
        </view>
        <slot name="left"></slot>
        <view class="content" :style="[{top:(statusBarHeight||44) + 'px'}]">
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
import { Action, State } from "vuex-class";
@Component({
  name: "cu-custom"
})
export default class CuCustom extends Vue {
  @Prop({
    type: [Boolean, String],
    default: false
  })
  private isback!: [Boolean, String];
  @Prop({
    type: String,
    default: "blue"
  })
  private bgColor!: string;
  CustomBar = 84;
  statusBarHeight = 20;
  created() {
    let info = uni.getSystemInfoSync();
    let custom = uni.getMenuButtonBoundingClientRect();
    this.statusBarHeight = info.statusBarHeight || 20;
    this.CustomBar = info.statusBarHeight
      ? custom.bottom!! + custom.top!! - info.statusBarHeight!!
      : 84;
  }
  get style() {
    var style = `height:${this.CustomBar}px;padding-top:${this.statusBarHeight}px;`;
    if (this.bgColor) {
      style = `${style}background:${this.bgColor}`;
    }
    return style;
  }

  BackPage() {
    this.$emit("back");
    uni.navigateBack({
      delta: 1
    });
  }
}
</script>

<style>
</style>
