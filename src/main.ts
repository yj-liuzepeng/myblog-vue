/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: 入口文件
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia, storeToRefs } from "pinia";
import { useMainStore } from "./store/index";

import "../src/styles/index.scss";
import elementPlus from "./utils/element";
import lazyPlugin from "vue3-lazy";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import clickstyle from "./styles/coolstyles/clickstyle"; // 全局鼠标点击动效
// 引入了ant的timeline，后面去掉这部分，使用element处理
import { Timeline } from "ant-design-vue";
// import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import "ant-design-vue/lib/timeline/style/index.css";
// 预览组件以及样式
import VMdPreviewHtml from "@kangc/v-md-editor/lib/preview-html";
import "@kangc/v-md-editor/lib/style/preview-html.css";

// 主题样式
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import loadingpic from "./assets/other/load.gif";
import errorpic from "./assets/other/404.png";
import { getCurStyle } from "./apis/style";
import { addVist, getVistPosition } from "./apis/user";
import { getOsInfo, getBrowser } from "./utils/getInfo";
import { styleone, styletwo } from "./styles/skinstyles/styles";

const addUserVist = (ip, city) => {
  addVist({
    ip,
    city,
    device: getOsInfo().name,
    browser: getBrowser().type + "(v" + getBrowser().versions + ")",
  });
};
const getStyle = async () => {
  await getCurStyle().then((res: any) => {
    if (res.code == 200) {
      let styleData = res.data;
      let {
        header_background: bgc0,
        header_color: textcolor0,
        header_click_color: activetextcolor0,
      } = styleData[0];
      let {
        header_background: bgc1,
        header_color: textcolor1,
        header_click_color: activetextcolor1,
      } = styleData[1];
      styleone.headerstyle = {
        bgc: bgc0,
        textcolor: textcolor0,
        activetextcolor: activetextcolor0,
      };
      styletwo.headerstyle = {
        bgc: bgc1,
        textcolor: textcolor1,
        activetextcolor: activetextcolor1,
      };
      if (res.ishb == 1) {
        import("../src/styles/hb.scss");
      }
    } else {
      styleone.headerstyle = {
        bgc: "#2b3645",
        textcolor: "#fff",
        activetextcolor: "#4c9b7d",
      };
      styletwo.headerstyle = {
        bgc: "#813744",
        textcolor: "#fff",
        activetextcolor: "#548c96",
      };
      styleone.otherstyle.scrollbarbgc = "#2b3645";
      styletwo.otherstyle.scrollbarbgc = "#813744";
    }

    const app = createApp(App);
    // 按需引入element-plus
    elementPlus(app);
    clickstyle();
    app.use(router);
    app.use(createPinia());
    // 引入v-md-editor预览组件
    app.use(VMdPreviewHtml);
    app.use(Timeline);
    app.use(VueViewer);
    // 图片懒加载
    app.use(lazyPlugin, {
      loading: loadingpic, // 加载时默认图片
      error: errorpic, // 图片失败时默认图片
    });
    const mainStore = useMainStore();
    // 获取定位，记录访问
    getVistPosition().then((res: any) => {
      mainStore.savePosition({
        ip: res.data.ip,
        city: res.data.position.city,
      });
      const { position } = storeToRefs(mainStore);
      addUserVist(position.value?.ip, position.value?.city);
      app.mount("#app");
    });
  });
};
getStyle();
