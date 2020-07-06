<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-07-06 19:27:47
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-06 19:31:00
--> 
<template>
  <mycontent title="数字旭辉"></mycontent>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import mycontent from "@/components/mycontent.vue";
@Component({components: {mycontent},name:'Index'})
export default class Index extends Vue {
created() {}
mounted() {}
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */

</style>