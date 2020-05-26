<!--
 * @Descripttion: 主页
 * @version: 
 * @Author: 小白
 * @Date: 2020-04-13 13:28:51
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-26 15:30:45
 -->
<template>
  <view style="width:100vw">
    <cu-custom :isback="isback" @back="$emit('back')">
      <block slot="content">{{title}}</block>
    </cu-custom>
    <view
      :style="{'padding-top':`${cuCustom}px`}"
      style="width:100vw;padding-left:48upx;padding-right:48upx"
    >
      <slot></slot>
    </view>
  </view>
</template>
  
<script lang="ts">
import cuCustom from "@/assets/colorui/components/cu-custom.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
@Component({
  components: { cuCustom }
})
export default class extends Vue {
  @State CustomBar!: number;
  @Prop()
  private title!: string;
  @Prop({
    type: [Boolean, String],
    default: false
  })
  private isback!: [Boolean, String];
}
</script>