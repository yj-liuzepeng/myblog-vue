<template>
  <div class="home" id="home">
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="left-content">
          <div class="left-content-header">
            <el-row>
              <el-col :span="18">
                博客日志
                <span class="color-danger">{{ total || 0 }}</span> 篇
                <el-tag
                  class="tag-item"
                  v-if="curTag"
                  :style="[{ 'background-color': curTag.color }, { 'color': '#fff' }]"
                >{{ curTag.name }}</el-tag>
              </el-col>
              <el-col :span="6">
                <el-input
                  class="w-50 m-2"
                  v-model="searchIpt"
                  @change="hSearch"
                  @input="hIpt"
                  @blur="hBlur"
                  :suffix-icon="Search"
                  placeholder="搜索首页内容"
                />
              </el-col>
            </el-row>
          </div>
          <div class="left-content-items" v-if="total">
            <div class="left-content-item cssnicehover" v-for="item in articleList" :key="item.id">
              <div class="item-title" @click="toDetail(item)">{{ item.title }}</div>
              <div class="item-tags">
                <el-tag class="item-tags-top" v-if="item.top == '是'" type="danger">置顶</el-tag>
                <div class="item-tags-time">
                  <span style="color:#fa9200;" class="iconfont icon-icon mr-5px"></span>
                  <span>{{ UnixToDate(new Date(item.create_time), 6) }}</span>
                </div>
                <div class="item-tags-type">
                  <span style="color:#67c23a;" class="iconfont icon-fenlei mr-5px"></span>
                  <span style="margin-right: 10px;" v-for="tag in item.tag.split(',')">{{ tag }}</span>
                </div>
                <div class="item-tags-hot">
                  <span style="color:#f56c6c;" class="iconfont icon-icon1 mr-5px"></span>
                  <span>{{ item.hot }}</span>
                </div>
              </div>
              <div class="item-img" @click="toDetail(item)">
                <img :src="'http://localhost:8088/' + item.pic" :alt="item.title" />
                <!-- <img src="https://www.jsfan.net/upload/~`VI[[3~)FP68MI)}QHJ9[V.png" /> -->
              </div>
              <div class="item-txt">{{ item.description }}</div>
              <!-- <div class="item-more" @click="toDetail(item)">
                <span class="iconfont icon-fangda"></span> 查看全文 》
              </div>-->
            </div>
            <div class="pagination">
              <el-pagination
                background
                v-model:currentPage="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[3, 6, 9, 12]"
                :small="small"
                :disabled="disabled"
                :background="background"
                layout="sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </div>
          <div class="left-content-items nodata" v-else>
            <img style="width: 150px;height: 150px;" src="../assets/nodata.png" alt="暂无数据" />
            <div style="color: #bbbbbb;font-size: 14px;">暂无数据</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-content">
          <Author />

          <your-info />

          <tag-list @clickTag="hClickTag" />
        
        </div>
      </el-col>
    </el-row>
    <el-backtop />
  </div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import Author from '../components/author.vue'
import yourInfo from '../components/your-info.vue'
import tagList from '../components/tag-list.vue'
import { UnixToDate } from '../utils/datetime'
import { useRouter } from 'vue-router'
import { queryArticleList, likeQueryArticle, queryArticleByTag } from '../apis/article'
const router = useRouter()
const toDetail = (item) => {
  router.push({
    path: '/detail',
    query: {
      id: item.id
    }
  })
  // router.push({ name: 'detail', params: { html: item.html, article:JSON.stringify(item) } })
}
let searchIpt = ref('')
const pageNo = ref(1)

const pageSize = ref(6)
let total = ref()
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 页面滚动到顶部效果
const goTop = () => {
  let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
  let step = distance / 30; //每步的距离
  (function jump() {
    if (distance > 0) {
      distance -= step;
      window.scrollTo(0, distance);
      setTimeout(jump, 10);
    }
  })();
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  goTop()

  if (searchIpt.value) {
    hSearch()
  }
  if (curTag.value && curTag.value.name) {
    hClickTag(curTag.value)
  }
  else {
    getArticleList()
  }

}
const handleCurrentChange = (val: number) => {
  pageNo.value = val
  goTop()

  if (searchIpt.value) {
    hSearch()
  }
  if (curTag.value && curTag.value.name) {
    hClickTag(curTag.value)
  }
  else {
    getArticleList()
  }



}
let articleList = ref([])
const getArticleList = () => {
  let params = {
    pageSize: pageSize.value,
    pageNo: pageNo.value
  }
  queryArticleList(params).then((res: any) => {
    if (res.code == 200) {
      articleList.value = res.data.data
      total.value = res.data.total
    }
  })
}
// 模糊查询
const hSearch = () => {
  likeQueryArticle({
    queryipt: searchIpt.value,
    pageSize: pageSize.value,
    pageNo: pageNo.value
  }).then((res: any) => {
    if (res.code == 200) {
      articleList.value = res.data.data
      total.value = res.data.total
    } else {
      articleList.value = []
      total.value = 0
    }
  })
}
const hIpt = () => {
  if (searchIpt.value == '') {
    getArticleList()
  }
}
const hBlur = () => {
  if (searchIpt.value == '') {
    getArticleList()
  }
}
// 点击右侧标签
const curTag = ref()

const hClickTag = (tag) => {
  goTop()
  if (tag.name == '全部') {
    getArticleList()
    curTag.value = null
    return
  }
  curTag.value = tag
  queryArticleByTag({
    querytag: tag.name,
    pageSize: pageSize.value,
    pageNo: pageNo.value
  }).then((res: any) => {
    if (res.code == 200) {
      articleList.value = res.data.data
      total.value = res.data.total
    } else {
      articleList.value = []
      total.value = 0
    }
  })

}
onMounted(() => {
  getArticleList()
})
</script>

<style lang='scss' scoped>
.cssnicehover {
  transition: all linear 0.7s;
}
.cssnicehover:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);
  background-color: rgba(255, 255, 255, 0.5);
}
.home {
  padding-top: 3.2rem;
}

.left-content-header {
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 0.8rem;
  margin-bottom: 0.3rem;
}
.left-content-items {
  .left-content-item {
    padding: 0.75rem 0.3rem;
    .item-title {
      font-size: 1.3rem;
      color: #1e90ff;
      padding: 0 0.3rem;
      cursor: pointer;
    }
    .item-tags {
      display: flex;
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0.5rem 0;
      color: #aaa;
      font-size: 14px;
      .item-tags-top {
        padding: 0 0.5rem;
        margin-right: 0.8rem;
      }
      .item-tags-time {
        margin-right: 0.5rem;
      }
      .item-tags-type {
        margin-right: 0.5rem;
      }
      .item-tags-hot {
      }
      .mr-5px {
        margin-right: 0.3125rem;
      }
    }
    .item-img {
      width: 100%;
      height: 300px;
      cursor: pointer;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.5s ease-out 0.1s;
      }
    }
    .item-img:hover img {
      transform: scale(1.1);
    }
    .item-txt {
      margin-top: 1rem;
      color: #777;
      font-size: 14px;
    }
    .item-more {
      text-align: right;
      margin-right: 20px;
      font-size: 15px;
      color: rgb(30, 144, 255);
      cursor: pointer;
    }
  }
}
.nodata {
  height: 825px;
  text-align: center;
  img {
    margin-top: 100px;
  }
}
.right-content {
  width: 100%;
}
.pagination {
  margin: 25px 0 10px;
  text-align: center;
}
.el-pagination {
  justify-content: center;
}
</style>
<style>
/* 过度动画 */
/* 过度动画 */
.cssnice {
  animation: cssnice 1s both;
}
@keyframes cssnice {
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}
/* 过度动画 */
.cssnice1 {
  animation: cssnice1 1s both;
}
@keyframes cssnice1 {
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(3%, 0, 0);
  }
  65% {
    opacity: 1;
    transform: translate3d(-2.5%, 0, 0);
  }
  80% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  90% {
    opacity: 1;
    transform: translate3d(-1%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
/* 过度动画 */
.cssnice0 {
  animation: cssnice0 1s both;
}
@keyframes cssnice0 {
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
/* 过度动画 */
.cssnice2 {
  animation: cssnice2 1s both;
}
@keyframes cssnice2 {
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.cssnicehover {
  transition: all linear 0.5s;
}
.cssnicehover:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);
  background-color: rgba(255, 255, 255, 0.5);
}
/* .cssnicehover:hover .img{
  transform:scale(1.1,1.2);
} */
.cssnice3 {
  /* 分页动画 */
  animation: cssnice3 1s both;
}
@keyframes cssnice3 {
  20% {
    transform: rotate3d(0, 0, 1, 25deg);
  }
  40% {
    transform: rotate3d(0, 0, 1, -20deg);
  }
  60% {
    transform: rotate3d(0, 0, 1, 15deg);
  }
  80% {
    transform: rotate3d(0, 0, 1, -10deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
}
.cssnice4 {
  animation: cssnice4 1s both;
}
@keyframes cssnice4 {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, -3%, 0);
  }
  65% {
    opacity: 1;
    transform: translate3d(0, 2.5%, 0);
  }
  80% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  90% {
    opacity: 1;
    transform: translate3d(0, 1%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
/* 过度动画 */
.cssniceright {
  animation: cssniceright 1.2s both;
}
@keyframes cssniceright {
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(-3%, 0, 0);
  }
  65% {
    opacity: 1;
    transform: translate3d(2.5%, 0, 0);
  }
  80% {
    opacity: 1;
    transform: translate3d(-2%, 0, 0);
  }
  90% {
    opacity: 1;
    transform: translate3d(-1%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.ant-comment-inner img {
  /* 旋转头像 */
  transition: all 1s;
}
.ant-comment-inner:hover img {
  transform: rotate(360deg);
}
.ant-back-top-inner:hover {
  /* 置顶特效 */
  animation: btn-pudding 2s linear;
}
@keyframes btn-pudding {
  12%,
  15% {
    transform: scale(0.93, 1.07);
  }

  16%,
  17% {
    transform: scale(0.94, 1.06);
  }
  10%,
  18% {
    transform: scale(0.95, 1.05);
  }
  19% {
    transform: scale(0.96, 1.04);
  }
  20% {
    transform: scale(0.98, 1.02);
  }
  21%,
  40%,
  48% {
    transform: scale(0.99, 1.01);
  }
  22%,
  23%,
  37%,
  39%,
  49% {
    transform: scale(1, 1);
  }
  7%,
  24%,
  34%,
  36% {
    transform: scale(1.01, 0.99);
  }
  25%,
  27%,
  30%,
  33% {
    transform: scale(1.02, 0.98);
  }
  28%,
  29% {
    transform: scale(1.03, 0.97);
  }
  2% {
    transform: scale(1.16, 0.84);
  }
  0% {
    transform: scale(1.2, 0.8);
  }
}
</style>