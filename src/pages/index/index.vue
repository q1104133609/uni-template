<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-05-11 22:47:38
 * @LastEditors: 小白
 * @LastEditTime: 2020-05-22 17:22:13
 -->
<!--  -->
<template>
  <mycontent title="数字旭辉" :isback="searchWodr" @back="isfocus=false;searchWodr='';isRecord = false">
    <scroll-view scroll-y :style="{'height':height}">
      <view v-if="searchWodr">
        <textarea
          v-model="searchWodr"
          :focus="isfocus"
          :display="isRecord"
          confirm-type="send"
          class="myInput"
          auto-height
          @confirm="getData"
        />
        <view
          class="hint_Text row_center"
          style="margin-top:8upx;font-size:40upx;justify-content: flex-start;"
          @click="isfocus=true"
          v-if="!isRecord"
        >
          轻点以编辑
          <image
            src="../../static/images/riw_arr.png"
            style="height:22upx;width:12upx;margin-left:14upx;"
          />
        </view>
        <view
          class="noraml_Text"
          style="font-size:40upx;margin-top:40upx"
          v-if="!isRecord&&items.length>0"
        >为你找到如下结果：</view>
        <myBlock
          v-for="item in items"
          :key="item.id"
          :title="item.appName"
          :content="item.appDescription"
          :url="item.appUrl"
          :viewAppId="item.id"
        />
        <view v-if="items.length<=0&&!isRecord&&!isWaitBack">
          <view
            class="noraml_Text"
            style="font-size:40upx;margin-top:4upx;margin-bottom:50upx"
          >未找到结果，你可以这样问：</view>
          <view
            class="noraml_Text"
            style="margin-top:37upx"
            v-for="item in queryCommonTips"
            :key="item.id"
            @click="toSearch(item.tipContent)"
          >“{{item.tipContent}}”</view>
        </view>
      </view>

      <view class="noraml_Text" v-else-if="isRecord||isAnimotion">
        正在听
        <br />请继续…
      </view>
      <!-- <view class="noraml_Text" v-else-if="isAnimotion">准备中...</view> -->
      <view v-else>
        <view class="hint_Text mT20" v-if="employeeInfo&&employeeInfo.name">你好，{{employeeInfo.name}}</view>
        <view class="big_Text" style="margin-top:4upx;margin-bottom:50upx">你可以这样问：</view>
        <view
          class="noraml_Text"
          style="margin-top:37upx"
          v-for="item in queryCommonTips"
          :key="item.id"
          @click="toSearch(item.tipContent)"
        >“{{item.tipContent}}”</view>
      </view>
    </scroll-view>
    <view class="bottom_view">
      <div class="gradient-text" v-if="!isRecord&&!searchWodr">轻轻按住，说出你想搜索的内容</div>
      <view class="row_center video_view">
        <image src="../../static/images/history.png" class="history" @click.stop="toHistory" />
        <Recode :isRecord="isAnimotion" @startRecord="startRecord" @endRecord="endRecord" />
      </view>
    </view>
  </mycontent>
</template>

<script lang='ts'>
import mycontent from "@/components/mycontent.vue";
import myBlock from "@/components/block.vue";
import Recode from "@/components/recode.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
//@ts-ignore
import CryptoJS from "../../../node_modules/crypto-js/crypto-js.js";
import { getAuth } from "../../utils/util";
import { get } from "../../plugins/request";
//@ts-ignore
const base64 = require("@/utils/base64.js");
@Component({ components: { mycontent, myBlock, Recode }, name: "Index" })
export default class Index extends Vue {
  recorderManager = uni.getRecorderManager();
  items: any[] = [];
  isLastFrame = false; //是否最后一帧
  firstSend = true; //是否第一次
  isfocus = false; //是否有焦点
  isWaitBack = false;
  isAnimotion = false;
  height = `calc(100vh - ${getApp().globalData!.CustomBar + 320}rpx)`;
  searchWodr = ""; //搜索内容
  options = {
    duration: 1000 * 60,
    sampleRate: 16000,
    numberOfChannels: 1,
    encodeBitRate: 48000,
    format: "mp3",
    frameSize: 3
  };
  queryCommonTips: any[] = [];
  xfInfo: any = {};
  employeeInfo: any = {};
  innerAudioContext = uni.createInnerAudioContext();
  intervalTime = 0;
  timer: any = null;
  isRecord = false;
  isUp = true;
  iatResult: any[] = [];

  async created() {
    get("/api/public/wechat/tip/content/config/queryCommonTips").then(v => {
      this.queryCommonTips = v.rows;
    });
    if (getAuth()) {
      let res = await get("/api/wechat/init/info/query");
      this.employeeInfo = res.employeeInfo;
      this.xfInfo = res.xfyunAuthConfig;
      getApp().globalData!!.userName = res.employeeInfo.userName;
    }
  }

  //搜索数据
  async getData() {
    if (this.searchWodr) {
      const res = await get("/api/wechat/app/search/index/query", {
        searchParam: this.searchWodr
      });
      if (res.success) {
        this.isWaitBack = false;
        if (res.rows.length === 1) {
          getApp().globalData!.url = res.rows[0].appUrl;
          getApp().globalData!.title = res.rows[0].appName;
          getApp().globalData!.viewAppId = res.rows[0].id;
          uni.navigateTo({
            url: "/pages/webview/webview",
            success: () => {
              let naTo = setInterval(() => {
                clearInterval(naTo);
                this.items = res.rows;
              }, 500);
            }
          });
        } else {
          this.items = res.rows;
        }
      }
    } else {
      this.isWaitBack = false;
    }
  }

  //监听socket
  mounted() {
    //录音开始
    this.recorderManager.onStart(() => {
      console.log("开始回调================");
      if (!this.isAnimotion) return;
      console.log("确定开始录音开始回调================");
      this.isRecord = true;
      this.intervalTime = 0;
      this.isLastFrame = false;
      this.searchWodr = "";
      this.isfocus = false;
      this.items = [];
    });
    //录音结束
    this.recorderManager.onStop(res => {
      console.log("录音结束回调=========");
    });
    //录音回调
    this.recorderManager.onFrameRecorded((res: any) => {
      const { frameBuffer, isLastFrame } = res;
      let params: any = {
        common: { app_id: this.xfInfo.appId },
        business: {
          language: "zh_cn", //小语种可在控制台--语音听写(流式)--方言/语种处添加试用
          domain: "iat",
          accent: "mandarin", //中文方言可在控制台--语音听写(流式)--方言/语种处添加试用
          vad_eos: 1000,
          dwa: "wpgs"
        },
        data: {
          status: 0,
          format: "audio/L16;rate=16000",
          encoding: "lame",
          audio: uni.arrayBufferToBase64(frameBuffer)
        }
      };
      // 拼接数据
      let status = 0;
      if (this.firstSend) {
        this.firstSend = false;
      } else {
        if (isLastFrame) {
          status = 2;
        } else {
          status = 1;
        }
      }
      params.data.status = status;

      console.log(
        "发送参数:",
        status,
        `isRecord:${this.isRecord}`,
        `isAnimotion:${this.isAnimotion}`,
        `isUp:${this.isUp}`
      );

      uni.sendSocketMessage({
        data: JSON.stringify(params),
        success: data => {
          console.log("send success:" + JSON.stringify(data));
        },
        fail: err => {
          // this.isLastFrame = true;
          // this.recorderManager.stop();
          // this.onRecordOver();
          console.log("send error:" + JSON.stringify(err));
        },
        complete: () => {
          if (isLastFrame) {
            this.isLastFrame = true;
          }
        }
      });
    });
    uni.onSocketOpen(data => {
      this.iatResult = [];
      console.log("链接socket=============");
      this.recorderManager.start(this.options);
    });
    uni.onSocketError(err => {
      console.log("socket服务连接失败，请重试", err);
    });
    uni.onSocketClose(data => {
      console.log("关闭socket=========");
      if (this.isRecord) {
        this.recorderManager.stop();
        this.isAnimotion = false;
        this.isRecord = false;
        this.getData();
      }
    });
    uni.onSocketMessage((res: any) => {
      console.log("收到服务器返回消息", res);
      let reponse = JSON.parse(res.data);
      if (reponse.code === 0) {
        let str = "";
        this.iatResult[reponse.data.result.sn] = reponse.data.result;
        if (reponse.data.result.pgs == "rpl") {
          reponse.data.result.rg.forEach((i: any) => {
            this.iatResult[i] = null;
          });
        }
        this.iatResult.forEach(i => {
          if (i != null) {
            i.ws.forEach((j: any) => {
              j.cw.forEach((k: any) => {
                str += k.w;
              });
            });
          }
        });
        this.searchWodr = str;
      }
      if (this.isLastFrame) {
        console.log("正常结束========onRecordOver=======");
        this.onRecordOver(reponse.data.status === 2);
      }
    });
  }

  //录音结束
  onRecordOver(isNoamlOver: boolean) {
    if (this.isRecord) {
      if (!isNoamlOver) uni.closeSocket();
      this.isAnimotion = false;
      this.isRecord = false;
      this.getData();
    }
  }
  //开始录音
  async startRecord() {
    console.log("startRecord", this.isRecord, this.isAnimotion, !this.isUp);
    if (this.isRecord || this.isAnimotion || !this.isUp) {
      return;
    }
    this.isUp = false;
    this.isAnimotion = true;
    this.timer = setInterval(() => {
      this.intervalTime += 0.5;
      if (this.intervalTime >= 0.5 && !this.isRecord) {
        uni.connectSocket({ url: this.getAuthStr() });
      }
    }, 300);
  }
  //结束录音
  endRecord() {
    if (this.isUp) return;
    console.log("放弃code=========");
    clearInterval(this.timer);
    this.isAnimotion = false;
    this.isUp = true;
    if (this.intervalTime <= 0.5) {
      console.log("时间过短=========");
      uni.closeSocket();
    }
    this.isWaitBack = true;
    this.intervalTime = 0;
    setTimeout(() => {
      console.log("关闭音频=========");
      this.recorderManager.stop();
    }, 300); //延迟小段时间停止录音, 更好的体验
  }

  // 鉴权签名
  getAuthStr() {
    let date = new Date().toUTCString();
    let host = "iat-api.xfyun.cn";
    let uri = "/v2/iat";
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${uri} HTTP/1.1`;
    let signatureSha = CryptoJS.HmacSHA256(
      signatureOrigin,
      this.xfInfo.apiSecret
    );
    let signature = CryptoJS.enc.Base64.stringify(signatureSha);
    let authorizationOrigin = `api_key="${this.xfInfo.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
    let authStr = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(authorizationOrigin)
    );

    let url = "wss://iat-api.xfyun.cn/v2/iat";
    url = `${url}?authorization=${encodeURI(authStr)}&date=${encodeURI(
      date
    )}&host=${encodeURI(host)}`;
    return url;
  }
  //点击搜索
  toSearch(search: string) {
    this.searchWodr = search;
    this.getData();
  }
  //历史跳转
  toHistory() {
    uni.navigateTo({
      url: "/pages/history/history"
    });
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.myInput {
  font-size: 68upx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 95upx;
  height: 400upx;
  width: 100%;
}

.bottom_view {
  position: fixed;
  bottom: 40upx;
  left: 0upx;
  z-index: 1;
  width: 100%;

  .video_view {
    margin-top: 13upx;
    position: relative;
    .history {
      height: 48upx;
      width: 48upx;
      position: absolute;
      margin: auto;
      left: 48upx;
      top: 0;
      bottom: 0;
    }
  }
}
.gradient-text {
  font-size: 36upx;
  background: linear-gradient(
    90deg,
    rgba(247, 96, 136, 1) 0%,
    rgba(71, 200, 249, 1) 100%
  );
  opacity: 0.6;
  text-align: center;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>