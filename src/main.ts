import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from "pinia"
import '../src/styles/index.scss'
import elementPlus from '../element'
import clickstyle from './styles/coolstyles/clickstyle' // 全局鼠标点击动效

// 预览组件以及样式
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';


// 主题样式
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';




const app = createApp(App)
// 按需引入element-plus
elementPlus(app)
clickstyle()
app.use(router)
app.use(createPinia())
// 引入v-md-editor预览组件
app.use(VMdPreviewHtml);
app.mount('#app')
