<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-12 22:52:46
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-16 10:35:55
 -->
<!--  -->
<template>
  <mycontent title="查看记录" :isback="true">
    <scroll-view class="historycontent" scroll-y :style="{'height':height}">
      <myBlock
        v-for="item in items"
        :key="item.id"
        :title="item.viewAppName"
        :content="item.appDescription"
        :url="item.viewappUrl"
      />
    </scroll-view>
    <view
      style="color:white;margin-top:50vh;text-align:center;font-size:40upx"
      v-if="items.length==0"
    >暂无数据</view>
  </mycontent>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import mycontent from "@/components/mycontent.vue";
import myBlock from "@/components/block.vue";
import { get } from "../../plugins/request";
@Component({ components: { mycontent, myBlock }, name: "History" })
export default class extends Vue {
  items: any[] = [];
  height = `calc(100vh - ${getApp().globalData!.CustomBar + 140}rpx)`;
  async created() {
    let res = await get("/api/wechat/view/history/query");
    if (res.success) {
      this.items = res.rows;
    }
  }
  mounted() {}
}
</script>
<style lang='scss' scoped>
.historycontent {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>