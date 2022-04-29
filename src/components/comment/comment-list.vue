<!--
 * @Author: lzp
 * @Date: 2022-03-31 14:29:07
 * @Description: file content
-->
<template>
  <div class="comment-list">
    <div class="comment-item cssnice4" v-for="item  in data">
      <div class="item-avatar">
        <span v-if="item.from_avatar">
          <el-avatar :size="30" class="comment-avatar" :src="item.from_avatar" />
        </span>
        <span v-else>
          <el-avatar :size="30" class="comment-avatar">
            {{ item.from_name.substring(0, 3) || item.from_name }}
          </el-avatar>
        </span>

      </div>
      <div class="item-content">
        <div class="top">
          <span class="username">{{ item.from_name }}</span>
          <span class="commenttime">{{ UnixToDate(new Date(item.create_time), 3) }}</span>
          <span class="area">
            <!-- <span class="iconfont icon-didian"></span> -->
            {{ item.from_area }}
          </span>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="bottom">
          <span class="like">

            <span v-if="userCommentLike.indexOf(String(item.id)) != -1" class="icon iconfont icon-dianzan_kuai"
              style="color: #8c8c8c;" @click="addOrDelLike(item)" />
            <span v-else class="icon iconfont icon-dianzan" @click="addOrDelLike(item)" style="color: #8c8c8c;" />
            {{ item.like_num }}
          </span>
          <span class="rep" @click="replyComment(item)">回复</span>
          <span class="del" @click="delComment(item)">
            删除
            <span class="icon iconfont icon-shanchu_o"></span>
          </span>
        </div>
        <!-- 回复输入框 -->
        <div class="reply-ipt" v-if="showReply && curReplyId == item.id">
          <el-input v-model="replyIpt" :placeholder="'回复@' + item.from_name" show-word-limit type="textarea" rows="2" />
          <div class="reply-ipt-btns">
            <el-button size="small" type="info" @click="cancel">取消</el-button>
            <el-button type="primary" size="small" @click="sendComment(item)">发送</el-button>
          </div>
        </div>
        <div v-if="item.children && item.children.length">
          <div class="children" v-for="child in item.children">
            <div class="children-avatar">
              <span v-if="child.from_avatar">
                <el-avatar :size="30" class="comment-avatar" :src="child.from_avatar" />
              </span>
              <span v-else>
                <el-avatar :size="30" class="comment-avatar">
                  {{ child.from_name.substring(0, 3) || child.from_name }}
                </el-avatar>
              </span>

            </div>

            <div class="children-content">
              <div class="children-top">
                <span class="username">{{ child.from_name }}</span>
                <span class="commenttime">{{ UnixToDate(new Date(child.create_time), 3) }}</span>
                <span class="area">
                  <!-- <span class="iconfont icon-didian"></span> -->
                  {{ child.from_area }}
                </span>
              </div>
              <div class="reply-user">@{{ child.target_name }}</div>
              <div class="children-content">{{ child.content }}</div>
              <div class="children-bottom">
                <span class="like">
                  <span v-if="userCommentLike.indexOf(String(child.id)) != -1" class="icon iconfont icon-dianzan_kuai"
                    style="color: #8c8c8c;" @click="addOrDelLike(child)" />
                  <span v-else class="icon iconfont icon-dianzan" @click="addOrDelLike(child)"
                    style="color: #8c8c8c;" />
                  {{ child.like_num }}
                </span>
                <span class="rep" @click="replyComment(child)">回复</span>
                <span class="del" @click="delComment(child)">
                  删除
                  <span class="icon iconfont icon-shanchu_o"></span>
                </span>
              </div>
              <!-- 回复输入框 -->
              <div class="reply-ipt" v-if="showReply && curReplyId == child.id">
                <el-input v-model="replyIpt" :placeholder="'回复@' + child.from_name" show-word-limit type="textarea"
                  rows="2" />
                <div class="reply-ipt-btns">
                  <el-button size="small" type="info" @click="cancel">取消</el-button>
                  <el-button type="primary" size="small" @click="sendComment(child)">发送</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more">
      <span v-if="more" class="get-more" @click="getMore">查看全部留言...</span>
      <span v-else class="no-more">已经到底了～～<span class="get-more" @click="getLess">收起</span></span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CommentList'
}
</script>
<script lang='ts' setup>
import { onMounted, ref, watch } from 'vue';
import ElMessage from '../../utils/resetMessage'
import { UnixToDate } from '../../utils/datetime'
import { addComment, deleteComment, addorDelLikeNum, rfhUserCommentLike } from '../../apis/comment'
import { storeToRefs } from 'pinia'
import { useMainStore } from "../../store";

const mainStore = useMainStore();
const { userInfo } = storeToRefs(mainStore)
const props = defineProps({
  // 评论数据
  data: {
    type: Array,
    default: () => []
  },
  more: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['reply', 'delete', 'refresh','getmore','getless'])
const userInfoData = ref()
let userCommentLike = ref()
const replyIpt = ref('')
let showReply = ref(false)
let curReplyId = ref('')
const showBefalse = (data) => {
  data.forEach(item => {
    if (item.show) item.show = false
    if (item.children) showBefalse(item.children)
  });

}
// 评论点赞或取消
const addOrDelLike = async (item) => {
  if (!userInfoData.value) {
    ElMessage({
      message: '请登录后点赞',
      type: 'warning',
    })
    return
  } else {
    let params;
    if (userCommentLike.value.indexOf(String(item.id)) == -1) {
      // 如果当前用户评论点赞中没有当前这一条，新增
      params = {
        id: item.id,
        type: 'add'
      }
      userCommentLike.value.push(String(item.id))
      userInfoData.value.comment_like = userCommentLike.value.join()
      localStorage.setItem('BLOGUSERINFO', JSON.stringify(userInfoData.value))
    } else {
      // 如果有，取消
      params = {
        id: item.id,
        type: 'del'
      }
      let idx = userCommentLike.value.indexOf(String(item.id))
      userCommentLike.value.splice(idx, 1)
      userInfoData.value.comment_like = userCommentLike.value.join()
      localStorage.setItem('BLOGUSERINFO', JSON.stringify(userInfoData.value))

    }
    await addorDelLikeNum(params).then((res: any) => {
      if (res.code == 200) {
        rfhUserCommentLike({ id: userInfoData.value.id, like: userInfoData.value.comment_like }).then(r => {
          if (r.code == 200) {
            emit('refresh')
          }
        })

      } else {
        ElMessage({
          message: res.msg,
          type: 'warning',
        })
      }
    })
  }
}
// 点击回复
const replyComment = (item) => {

  showReply.value = true
  curReplyId.value = item.id
  replyIpt.value = ''

}
// 点击删除
const delComment = (item) => {
  if (!userInfoData.value) {
    ElMessage({
      message: '请登录后删除',
      type: 'warning',
    })
    return
  } else {
    let params = {
      id: item.id,
      from_id: userInfoData.value.id,
    }
    deleteComment(params).then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          message: '删除成功！',
          type: 'success',
        })
        emit('refresh')
      } else {
        ElMessage({
          message: res.msg,
          type: 'warning',
        })
      }
    })
  }
}
const cancel = () => {
  showReply.value = false
}
// 回复评论发送
const sendComment = (item) => {
  if (!userInfoData.value) {
    ElMessage({
      message: '请登录后评论',
      type: 'warning',
    })
    return
  } else {
    let params = {
      type: '2',
      pid: item.id,
      page_id: item.page_id,
      target_id: item.from_id,
      target_name: item.from_name,
      from_id: userInfoData.value.id,
      from_name: userInfoData.value.username,
      from_avatar: userInfoData.value.avator,
      from_area: userInfoData.value.city,
      content: replyIpt.value,
    }
    if (!replyIpt.value) {
      ElMessage({
        message: '请输入评论内容',
        type: 'warning',
      })
      return
    } else {
      addComment(params).then((res: any) => {
        if (res.code == 200) {
          ElMessage({
            message: '评论成功！',
            type: 'success',
          })

        }
        else {
          ElMessage({
            message: res.msg,
            type: 'warning',
          })
        }
        replyIpt.value = ''
        showReply.value = false
        emit('refresh')
      })
    }


  }
}
// 查看更多评论
const getMore  =()=> {
  emit('getmore')
}
// 收起更多
const getLess = ()=> {
  emit('getless')
}
watch(() => showReply.value, (newval) => {
  // let classNameList = ['rep','reply-ipt','el-textarea__inner','reply-ipt-btns']
  if (newval) {
    // document.addEventListener('click', (e: any) => {
    //   console.log(e.target.className)
    //   // if (e.target.className != 'reply-ipt' || e.target.className == 'rep') {
    //   //   showReply.value = false
    //   // }
    // })
  }
})
watch(() => userInfo.value, (newval) => {
  userInfoData.value = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
  userCommentLike.value = userInfoData.value?.comment_like ? userInfoData.value.comment_like.split(',') : []
})
onMounted(() => {
  userInfoData.value = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
  userCommentLike.value = userInfoData.value?.comment_like ? userInfoData.value.comment_like.split(',') : []
})
</script>

<style lang='scss' scoped>
.comment-list {
  margin-top: 30px;

  .comment-item {
    display: flex;
    padding: 16px 0;

    .item-avatar {
      position: relative;
      flex-shrink: 0;
      margin-right: 12px;
      cursor: pointer;
    }

    .item-content {
      position: relative;
      flex: 1 1 auto;
      min-width: 1px;
      font-size: 14px;
      word-wrap: break-word;

      .top {
        font-size: 12px;

        .username {
          padding-right: 8px;
          color: rgb(241, 62, 95);
        }

        .commenttime {
          padding-right: 8px;
          color: #ccc;
        }

        .area {
          padding-right: 8px;
          color: #ccc;
        }
      }

      .content {
        margin: 5px 10px;
        color: #24292e;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;
      }

      .bottom {
        font-size: 12px;

        .like {
          .icon {
            font-size: 13px;
            margin-left: -3px;
            cursor: pointer;
          }
        }

        .rep {
          margin-left: 10px;
          margin-right: 10px;
          color: rgb(24, 144, 255);
          cursor: pointer;
        }

        .del {
          color: rgb(24, 144, 255);
          cursor: pointer;

          .icon {
            font-size: 15px;
            margin-left: -3px;
            cursor: pointer;
          }
        }
      }

      .children {
        display: flex;
        padding: 12px 0;

        .children-avatar {
          position: relative;
          flex-shrink: 0;
          margin-right: 12px;
          cursor: pointer;
        }

        .children-content {
          position: relative;
          flex: 1 1 auto;
          min-width: 1px;
          font-size: 14px;
          word-wrap: break-word;

          .children-top {
            font-size: 12px;

            .username {
              padding-right: 8px;
              color: rgb(241, 62, 95);
            }

            .commenttime {
              padding-right: 8px;
              color: #ccc;
            }

            .area {
              padding-right: 8px;
              color: #ccc;
            }
          }

          .reply-user {
            margin: 6px 0;
            font-size: 12px;
            color: rgb(111, 111, 231);
          }

          .children-content {
            margin: 10px 10px;
            color: #24292e;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
          }

          .children-bottom {
            font-size: 12px;

            .like {
              .icon {
                font-size: 13px;
                margin-left: -3px;
                cursor: pointer;
              }
            }

            .rep {
              margin-left: 10px;
              margin-right: 10px;
              color: rgb(24, 144, 255);
              cursor: pointer;
            }

            .del {
              color: rgb(24, 144, 255);
              cursor: pointer;

              .icon {
                font-size: 15px;
                margin-left: -3px;
                cursor: pointer;
              }
            }
          }
        }
      }

      .reply-ipt {
        margin-top: 10px;

        .reply-ipt-btns {
          margin-top: 10px;
          display: flex;
          justify-content: right;
        }
      }
    }
  }
  .more {
    text-align: center;
    .get-more{
      cursor: pointer;
      color: rgb(113, 113, 203);
      &:hover {
        color: rgb(71, 71, 228);
      }
    }
    .no-more {
      color: rgb(157, 151, 151);
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