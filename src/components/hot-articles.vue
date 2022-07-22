<template>
  <div class="hotarticles-box">
    <div class="hotarticles-box-title">
      热门文章
      <span class="iconfont icon-remen"></span>
    </div>
    <div class="hotarticles-box-content">
      <div class="title-list" v-for="(item, idx) in hotArticleList" @click="toArticle(item)">
        <span class="idx" :style="{ 'background-color': idx == 0 ? 'rgb(255, 190, 69)' : 'rgb(194, 190, 190)' }">{{ idx + 1
        }}</span>
        <span class="txt">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';

import { queryArticleByHot } from '../apis/article'
import { storeToRefs } from 'pinia'
import { useMainStore } from "../store";
import { useRouter } from 'vue-router'


const router = useRouter()
const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore)
const hotArticleList = ref([])
const getHotArticle = (n) => {
  queryArticleByHot({ n }).then((res: any) => {

    if (res.code == 200) {
      hotArticleList.value = res.data.data
    }
  })
}
const toArticle = (item) => {
  router.push({
    path: '/detail',
    query: {
      id: item.id
    }
  })
}
onMounted(() => {
  getHotArticle(8)
})
</script>

<style lang='scss' scoped>
.hotarticles-box {
  padding: 15px;

  .hotarticles-box-title {
    padding-bottom: 5px;
    font-size: 16px;
    border-radius: 4px;
    text-align: center;
    color: #ec4939;
    border-bottom: 1px solid #dcdfe6;
  }

  .hotarticles-box-content {
    margin-top: 15px;

    .title-list {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      padding: 0px 10px;
      font-size: 12px;
      margin-top: 8px;
      cursor: pointer;

      .idx {
        display: block;
        height: 20px;
        min-width: 20px;
        line-height: 20px;
        text-align: center;
        color: white;
        border-radius: 50%;

      }

      .txt {
        color: rgb(247, 60, 60);
        border-bottom: 1px dashed rgb(247, 60, 60);
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>