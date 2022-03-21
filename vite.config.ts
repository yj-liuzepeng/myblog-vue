// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
export default {
 
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(),AntDesignVueResolver()],
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
      '@kangc/v-md-editor/lib/preview-html',
      '@kangc/v-md-editor/lib/theme/vuepress.js',
      // 'prismjs/prism.js',
    ],
    

  },
}
