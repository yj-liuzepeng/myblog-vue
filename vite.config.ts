/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: file content
 */
// vite.config.ts

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// import viteImagemin from 'vite-plugin-imagemin'
import {
  ElementPlusResolver,
  // AntDesignVueResolver,
} from "unplugin-vue-components/resolvers";

import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
export default {
  port: 8989, // 你需要定义的端口号
  open: true,
  // resolve: {
  //   alias: {
  //     // 设置别名,@就代表src目录
  //     "@": pathResolve("src"),
  //   },
  // },
  plugins: [
    vue(),
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false
    //   },
    //   optipng: {
    //     optimizationLevel: 7
    //   },
    //   mozjpeg: {
    //     quality: 20
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox'
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false
    //       }
    //     ]
    //   }
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // AntDesignVueResolver()
      ],
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
  server: {
    cors: true, // 为开发服务器配置 CORS
    open: true, // 自动打开页面
    proxy: {
      "/getweather": {
        target: "https://way.jd.com", //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getweather/, ""),
      },
    },
  },
};
