/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: 入口文件
 */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import "../src/styles/index.scss";
import elementPlus from "./utils/element";
import lazyPlugin from 'vue3-lazy'
// import SimpleWeather from 'simple-weather-vue'
// import 'simple-weather-vue/dist/style.css'
import clickstyle from "./styles/coolstyles/clickstyle"; // 全局鼠标点击动效
// 引入了ant的timeline，后面去掉这部分，使用element处理
import { Timeline } from "ant-design-vue";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
// 预览组件以及样式
import VMdPreviewHtml from "@kangc/v-md-editor/lib/preview-html";
import "@kangc/v-md-editor/lib/style/preview-html.css";

// 主题样式
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import loadingpic from './assets/other/load.gif'

const app = createApp(App);
// 按需引入element-plus
elementPlus(app);
clickstyle();
// app.use(SimpleWeather)
app.use(router);
app.use(createPinia());
// 引入v-md-editor预览组件
app.use(VMdPreviewHtml);
app.use(Timeline);
// 图片懒加载
app.use(lazyPlugin, {
  loading:loadingpic, // 加载时默认图片
  error: loadingpic// 图片失败时默认图片
})
app.mount("#app");
