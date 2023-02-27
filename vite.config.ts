/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: file content
 */
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import vue from "@vitejs/plugin-vue";
// import { resolve } from "path";

// function pathResolve(dir) {
//   return resolve(__dirname, ".", dir);
// }
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
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // gzip压缩
    viteCompression({
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用,相当于开关在这里
      threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
      algorithm: "gzip", //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: ".gz", //文件后缀
    }),
    // CDN方式引入包
    // importToCDN({
    //   modules: [
    //     {
    //       name: "jquery",
    //       var: "jquery", //根据main.js中定义的来
    //       path: "dist/jquery.js",
    //     },
    //   ],
    // }),
    // 打包分析
    visualizer({
      emitFile: false,
      filename: "stats.html", // 分析图生成的文件名
      open: true, // 如果存在本地服务端口，将在打包后自动展示
    }),
  ],
  build: {
    outDir: "dist", //输出目录名
    minify: "terser", //压缩方式
    terserOptions: {
      compress: {
        drop_console: true, // 剔除console,和debugger
        drop_debugger: true,
      },
    },
    // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
    rollupOptions: {
      output: {
        //静态资源分类打包
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks(id) {
          //静态资源分拆打包
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "@kangc/v-md-editor/lib/preview-html",
      "@kangc/v-md-editor/lib/theme/vuepress.js",
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
