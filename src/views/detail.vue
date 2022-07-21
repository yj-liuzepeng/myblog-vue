<template>
  <div class="detail">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="18">
        <div class="left-content cssnice1" id="ceshi">
          <div class="detail-header">
            <div class="to-home" @click="toHome">首页</div>
            <div>/ {{ articleState.title }}</div>
          </div>
          <div class="detail-all-info">
            <div class="detail-title">{{ articleState.title }}</div>
            <div class="detail-info">
              <div class="time">
                <span style="color: #fa9200" class="iconfont icon-icon"></span>
                {{ articleState.createtime }}
              </div>
              <div class="hot">
                <span style="color: #f56c6c" class="iconfont icon-icon1"></span>
                {{ articleState.hot }}
              </div>
            </div>
            <div class="detail-img">
              <img :src="'https://liuzepeng.com/' + articleState.pic" :alt="articleState.title" />
            </div>
          </div>
          <el-divider content-position="center">
            <span style="color: #5e8ed3; font-size: 16px">description</span>
          </el-divider>
          <div class="detail-des">{{ articleState.description }}</div>

          <el-divider content-position="center">
            <span style="color: #5e8ed3; font-size: 16px">正文</span>
          </el-divider>
          <div id="preview-box">
            <v-md-preview-html :html="articleState.html" preview-class="vuepress-markdown-body"></v-md-preview-html>
          </div>
          <div class="tag-box">
            <div class="tag-list">
              <span class="iconfont icon-24gf-tags3"></span>
              <el-tag class="tag-item" v-for="item in articleState.taglist"
                :style="[{ 'background-color': item.color }, { color: '#fff' }]">{{ item.name }}</el-tag>
            </div>
            <div class="last-time">最后修改于{{ articleState.updatetime }}</div>
          </div>
          <el-divider></el-divider>

          <comment-box :can="articleState.comment" type="1" :targetId="articleId" :targetName="articleState.title" />
        </div>
      </el-col>
      <el-col :xs="0" :sm="6">
        <div class="right-content">
          <Author />
          <your-info />
        </div>
        <div id="catalogBox" class="sticky-top" :style="[
          { width: fixedCatalog ? (rightContentWidth + 'px') : '100%' },
          { position: fixedCatalog ? 'fixed' : '' },
          { top: fixedCatalog ? '25px' : '' }
        ]">
          <div class="catalog-title">文章标题</div>
          <div id="right-catalog"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import Author from "../components/author.vue";
import yourInfo from "../components/your-info.vue";
import commentBox from "../components/comment/index.vue";
import { useRoute, useRouter } from "vue-router";
import { UnixToDate } from "../utils/datetime";
import { queryArticleById, queryTagList } from "../apis/article";
// 引入目录
import Catalog from "../utils/catalog/index.js";
import "../utils/catalog/progress-catalog.css";
import { goTop } from "../utils/pageEffect";
import { storeToRefs } from "pinia";
import { useMainStore } from "../store";
const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore);
const route = useRoute();

const router = useRouter();

const articleId = ref();
const articleState = reactive({
  html: null,
  title: "",
  comment: "",
  createtime: "",
  updatetime: "",
  hot: "",
  pic: "",
  description: "",
  taglist: [],
});

const getArticle = async (id) => {
  await queryArticleById({ id }).then((res: any) => {
    if (res.code == 200) {
      articleState.html = res.data.data.html;
      articleState.title = res.data.data.title;
      articleState.comment = res.data.data.comment;
      articleState.createtime = UnixToDate(
        new Date(res.data.data.create_time),
        3
      );
      articleState.updatetime = UnixToDate(
        new Date(res.data.data.update_time),
        3
      );
      articleState.hot = res.data.data.hot;
      articleState.pic = res.data.data.pic;
      articleState.description = res.data.data.description;
      articleState.taglist = tagLists.value.filter((item) => {
        return res.data.data.tag.split(",").indexOf(item.name) != -1;
      });
    }
  });
  // 侧边分页
  new Catalog({
    contentEl: "preview-box", // 需要检索生成目录的内容区的id选择器
    catalogEl: "right-catalog", // 将生成的目录append进的目录容器的id选择器
    // scrollWrapper:'', // 监听scroll事件的内容区容器的id选择器，不需要加#，如果不填则默认是 contentEl 的父元素
    // cool: false,
    // selector: ['h2', 'h3']
  });
};
let tagLists = ref([]);
const getTagList = async () => {
  let params = {
    pageSize: 999,
    pageNo: 1,
  };
  await queryTagList(params).then((res: any) => {
    getArticle(route.query.id);
    if (res.code === 200) {
      tagLists.value.push(...res.data.data);
    }
  });
};
const toHome = () => {
  router.push({ name: "home" });
};
onBeforeMount(() => {
  articleId.value = route.query.id;
});
let fixedCatalog = ref(false);
let startOffsetTop = ref();
let rightContentWidth = ref()
const handleScroll = () => {
  let rightContent = document.querySelector('.right-content')
  rightContentWidth.value = rightContent?.offsetWidth
  // 滚动距离
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  // 元素距离顶部
  let offsetTop = document.querySelector("#catalogBox")?.offsetTop;
  scrollTop > offsetTop + 60
    ? (fixedCatalog.value = true)
    : (fixedCatalog.value = false);
  if (offsetTop == 25) {
    scrollTop - 60 <= startOffsetTop.value
      ? (fixedCatalog.value = false)
      : (fixedCatalog.value = true);
  }
};
onMounted(() => {
  getTagList();
  goTop();
  window.addEventListener("scroll", handleScroll);
  startOffsetTop.value = document.querySelector("#catalogBox")?.offsetTop;
  // window.addEventListener('scroll', function(e) {
  //   console.log(123)
  // })
});
</script>

<style lang="scss" scoped>
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
        width: 60%;
        margin: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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

    .tag-box {
      background-color: rgba(230, 234, 240, 0.4);
      width: 100%;
      padding: 10px;

      .tag-list {
        .tag-item {
          margin-left: 10px;
        }
      }

      .last-time {
        display: flex;
        justify-content: right;
        color: rgb(204, 204, 204);
      }
    }
  }

  .right-content {
    width: 100%;
    margin-bottom: 10px;
  }

  .sticky-top {
    position: -webkit-sticky;
    box-sizing: border-box;
    height: 600px;
    overflow: scroll;
    overflow-x: hidden;
    border: 1px solid;
    padding: 0.3rem;
    border: 1px solid rgb(238, 238, 238);
    border-radius: 0.3rem;

    &::-webkit-scrollbar {
      width: 0px;
    }

    & {
      // 兼容火狐
      scrollbar-width: none;
      /* 滚动条宽度有三种：thin、auto、none */
    }

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
}
</style>
<style>
.cl-wrapper li>.cl-link.cl-link-active {
  /* color: blue; */
  color: v-bind("authorstyle.textcolor") !important;
  transition: all 0.5s ease 0s;
}
</style>
