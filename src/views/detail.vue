<template>
  <div class="detail">
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="left-content">
          <div class="detail-header">
            <div class="to-home" @click="toHome">首页</div>
            <div>/ {{ articleState.title }}</div>
          </div>
          <div class="detail-all-info">
            <div class="detail-title">{{ articleState.title }}</div>
            <div class="detail-info">
              <div class="time">
                <span style="color:#fa9200;" class="iconfont icon-icon"></span>
                {{ articleState.createtime }}
              </div>
              <div class="hot">
                <span style="color:#f56c6c;" class="iconfont icon-icon1"></span>
                {{ articleState.hot }}
              </div>
            </div>
            <div class="detail-img">
              <img :src="'http://localhost:8088/' + articleState.pic" :alt="articleState.title" />
            </div>
          </div>
          <el-divider content-position="center">
            <span style="color: #5e8ed3;font-size: 16px;">description</span>
          </el-divider>
          <div class="detail-des">{{ articleState.description }}</div>
           
            <el-divider content-position="center">
              <span style="color: #5e8ed3;font-size: 16px;">正文</span>
            </el-divider>
          
          <div id="preview-box">
            <v-md-preview-html :html="articleState.html" preview-class="vuepress-markdown-body"></v-md-preview-html>
          </div>
          
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-content">
          <Author />
          <your-info />
          <!-- <el-affix> -->
          <div class="catalog-content sticky-top">
            <div class="catalog-title">文章标题</div>
            <div id="right-catalog"></div>
          </div>
   
          <!-- </el-affix> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import Author from '../components/author.vue'
import yourInfo from '../components/your-info.vue'
// import tagList from '../components/tag-list.vue'
import { useRoute, useRouter } from 'vue-router'
import { UnixToDate } from '../utils/datetime'
import { queryArticleById } from '../apis/article'
// 引入
import Catalog from 'Progress-catalog'
import 'progress-catalog/src/progress-catalog.css'
const route = useRoute()

const router = useRouter()
const articleState = reactive({
  html: null,
  title: '',
  createtime: '',
  hot: '',
  pic: '',
  description: ''
})
let hTreeData = ref([]) // 保存h标签为树形结构
const getArticle = async (id) => {
  await queryArticleById({ id }).then((res: any) => {
    if (res.code == 200) {
      articleState.html = res.data.data.html
      articleState.title = res.data.data.title
      articleState.createtime = UnixToDate(new Date(res.data.data.create_time), 3)
      articleState.hot = res.data.data.hot
      articleState.pic = res.data.data.pic
      articleState.description = res.data.data.description
    }
  })
  // 侧边分页
  new Catalog({
    contentEl: 'preview-box',
    catalogEl: 'right-catalog',
    // cool: false
    // selector: ['h2', 'h3']
  })
}

const boxScroll = (obj) => {
  console.log(obj.scrollTop, obj.fixed)
}
const toHome = () => {
  router.push({ name: 'home' })
}
onMounted(() => {
  getArticle(route.query.id)


})
</script>

<style lang='scss' scoped>
.detail {
  padding-top: 3.2rem;
  .left-content {
    border: 1px solid rgb(242, 235, 235);
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    margin-right: 10px;
    .detail-header {
      background-color: rgb(225, 240, 255);
      padding: 10px 0px 10px 5px;
      display: flex;
      color: rgb(0, 121, 136);
      font-size: 16px;
      .to-home {
        color: rgb(32, 157, 123);
        cursor: pointer;
        // text-decoration: underline;
        font-weight: 600;
      }
    }
    .detail-all-info {
      text-align: center;
      width: 100%;
      .detail-title {
        font-size: 28px;
        font-weight: 600;
        color: rgb(32, 157, 123);
      }
      .detail-info {
        display: flex;
        padding: 20px 0px;
        -webkit-box-pack: center;
        justify-content: center;
        font-size: 14px;
        .time {
          padding: 0 10px;
        }
      }
      .detail-img {
        img {
          width: 100%;
        }
      }
    }
    .detail-des {
      color: rgb(107, 106, 106);
      padding: 10px;
    }
  }
  .right-content {
    .catalog-title {
      padding-bottom: 5px;
      font-size: 16px;
      border-radius: 4px;
      border-bottom: 1px solid #dcdfe6;
      text-align: center;
      margin-bottom: 15px;
    }
    #right-catalog {
      margin-bottom: 15px;
    }
  }
  .sticky-top {
    // position: -webkit-sticky;
    position: sticky;
    top: 20px;
  }
}
</style>