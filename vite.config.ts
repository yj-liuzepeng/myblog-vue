// vite.config.ts
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
export default {
  port: 8989, // 你需要定义的端口号
  open: true,
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
    }),
  ],
  css: {
    // css预处理器
    // preprocessorOptions: {
    //   scss: {
    //     charset: false,
    //     additionalData: '@import "./src/styles/index.scss";',
    //   },
    // },
  },
  optimizeDeps: {
    include: [
      "@kangc/v-md-editor/lib/preview-html",
      "@kangc/v-md-editor/lib/theme/vuepress.js",
      // 'prismjs/prism.js',
    ],
  },
  // server: {
  //   cors: true, // 为开发服务器配置 CORS
  //   open: true, // 自动打开页面
  //   proxy: {
  //     "/getweather": {
  //       target: "https://way.jd.com", //代理接口
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/getweather/, ""),
  //     },
  //   },
  // },
};
