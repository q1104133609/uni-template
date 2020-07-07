<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-07-06 19:27:47
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-07 12:22:26
--> 
<template>
  <mycontent title="主页">
    <cell
      @startmessage="startmessage"
      @completemessage="completemessage"
      plugid="ea8fa16642f5cefb883c9efd754a2d8e"
    />
  </mycontent>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import mycontent from "@/components/mycontent.vue";
@Component({ components: { mycontent }, name: "Index" })
export default class Index extends Vue {
  created() {}
  mounted() {}
  completemessage(res:any) {
   
  }
  startmessage() {}
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
</style>