<!--
 * @Descripttion: 
 * @version: 
 * @Author: 小白
 * @Date: 2020-04-13 13:28:51
 * @LastEditors: 小白
 * @LastEditTime: 2020-07-06 18:14:51
--> 
 <script lang="ts">
import Vue from "vue";
import { getAuth, setAuth, getWxCode, getAPPInfo } from "./utils/util";
import { BaseRequest, post } from "./plugins/request";
import { init } from "./utils/qiniuUploader";
import "@/assets/colorui/main.css";
import "@/assets/colorui/icon.css";
import { host } from "./commont/constant";

export default Vue.extend({
  mpType: "app",
  globalData: {
    StatusBar: 0,
    CustomBar: 0
  },
  onLaunch() {
    var options = {
      region: "ECN", // 是你注册bucket的时候选择的区域的代码
      domain: "cdng.huangb.top", // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
      uptokenURL: `${host}/qiniu`, // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "0MLvWPnyy..."}
      shouldUseQiniuFileName: false // 如果是 true，则文件 key 由 qiniu 服务器分配 (全局去重)。默认是 false: 即使用微信产生的 filename
    };
    init(options as any);
    if (uni.canIUse("getUpdateManager")) {
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        console.log("onCheckForUpdate====", res);
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log("res.hasUpdate====");
          updateManager.onUpdateReady(function() {
            uni.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function(res) {
                console.log("success====", res);
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              }
            });
          });
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            uni.showModal({
              title: "已经有新版本了哟",
              content: "新版本已经上线啦，请您删除当前小程序，重新搜索打开哟"
            });
          });
        }
      });
    }
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  }
});
</script>

