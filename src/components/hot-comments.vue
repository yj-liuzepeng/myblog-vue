<template>
  <div class="hotcomments-box">
    <div class="hotcomments-box-title">
      热门评论
      <span class="iconfont icon-remen"></span>
    </div>
    <div class="hotcomments-box-content">
      <div class="comment-list" v-for="item in hotArticleList">
        <div class="avatar">
          <span v-if="item.from_avatar">
            <el-avatar :size="30" class="comment-avatar" :src="item.from_avatar" />
          </span>
          <span v-else>
            <el-avatar :size="30" class="comment-avatar">
              {{ item.from_name.substring(0, 3) || item.from_name }}
            </el-avatar>
          </span>
        </div>
        <div>
          <div class="from-box">
            <div class="top">
              <span class="name">{{ item?.from_name.length > 14 ? (item.from_name.substring(0, 14) + '...') :
                  item.from_name
              }}</span>
              <span class="iconstyle iconfont icon-dianzan_kuai"></span>
              <span class="like-num">{{ item.like_num }}</span>
            </div>
            <div class="bottom">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';

import { queryCommentByHot } from '../apis/comment'
import { useRouter } from 'vue-router'

const router = useRouter()

const hotArticleList = ref([])
const getHotComment = (n) => {
  queryCommentByHot({ n }).then((res: any) => {

    if (res.code == 200) {
      hotArticleList.value = res.data.data
    }
  })
}

onMounted(() => {
  getHotComment(5)
})
</script>

<style lang='scss' scoped>
.hotcomments-box {
  padding: 15px;

  .hotcomments-box-title {
    padding-bottom: 5px;
    font-size: 16px;
    border-radius: 4px;
    text-align: center;
    color: #ec4939;
    border-bottom: 1px solid #dcdfe6;
  }

  .hotcomments-box-content {
    margin-top: 15px;

    .comment-list {
      display: flex;
      -webkit-box-align: center;
      justify-content: start;
      align-items: center;
      padding: 0px 10px;
      font-size: 12px;
      margin-top: 8px;
      cursor: pointer;

      .avatar {}

      .from-box {
        margin-left: 10px;

        .top {
          margin-bottom: 10px;

          .name {
            color: rgb(130, 130, 213);
            font-size: 14px;
          }

          .iconstyle {
            margin-left: 10px;
            margin-right: 5px;
            color: #c1c4cb;
            font-size: 12px;
          }

          .like-num {
            font-size: 12px;
            color: rgb(130, 130, 213);
          }
        }

        .bottom {
          font-size: 14px;
          color: #60997f;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}

.comment-avatar {
  transition: all 0.5s;
}

.comment-avatar:hover {
  transform: rotate(360deg);
}
</style>