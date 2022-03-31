/*
 * @Author: lzp
 * @Date: 2022-03-29 13:58:43
 * @Description: file content
 */
import { createApp } from "vue";
import App from "../App.vue";
import VueMatomo from "vue-matomo";
import router from "../router/index";
// 动态维护的文件
import baseUrlto from "./baseurlto";
const app = createApp(App);

// 这段代码作用是获取当前加载的路径,并去维护文件中数组里匹配出相应的的集合对象.
let uitem;
baseUrlto.map((e) => {
  if (document.URL.indexOf(e.environmentUrl) !== -1) {
    uitem = e;
  }
});
if (!uitem) {
  uitem = baseUrlto[0];
}
app.use(VueMatomo, {
  host: uitem.staUrl, // 这里是匹配到的地址
  siteId: uitem.staId, //这里是匹配到的siteId值
  // 根据router自动注册
  router: router,
  // // 是否需要在发送追踪信息之前请求许可
  // // 默认false
  requireConsent: false,
  enableLinkTracking: true,
  // // 是否追踪初始页面
  // // 默认true
  trackInitialView: false,
  // // 最终的追踪js文件名
  // // 默认 'piwik'
  trackerFileName: "matomo",
  debug: false,
});
