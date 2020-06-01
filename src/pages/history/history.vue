<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-12 22:52:46
 * @LastEditors: 小白
 * @LastEditTime: 2020-06-01 19:03:52
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
import { State } from "vuex-class";
@Component({ components: { mycontent, myBlock }, name: "History" })
export default class extends Vue {
  @State CustomBar!: number;
  items: any[] = [];

  get height() {
    return `calc(100vh - ${this.CustomBar}px - 30px)`;
  }
  async created() {
    let res = await get("/api/wechat/view/history/query");
    if (res.success) {
      this.items = res.rows;
    }
  }
  mounted() {}
  onShareAppMessage(res: any) {
    return {
      title: "数字旭辉",
      path: `/pages/start/start`,
      imageUrl: "../../static/images/share.png"
    };
  }
}
</script>
<style lang='scss' scoped>
.historycontent {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>