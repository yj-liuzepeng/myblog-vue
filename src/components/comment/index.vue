<!--
 * @Author: lzp
 * @Date: 2022-03-30 11:44:41
 * @Description: 评论组件
-->
<template>
  <div class="comment-box">
    <div class="top-txt">可以在这里发表您的看法或者建议(支持markdown语法)</div>
    <div class="comment-ipt">
      <el-input v-model="textarea" placeholder="请输入内容" show-word-limit type="textarea" rows="6" />
    </div>
    <div class="ipt-bottom">
      <el-button type="primary" @click="addCommentBtn">提交评论</el-button>
    </div>
    <div v-if="can == '1'">
      <comment-list :data="data" :more="more"
      @getmore = 'getMoreComments'
      @getless = 'getLessComments'
      @refresh="getCommentList()"></comment-list>
    </div>
    <div v-else class="close-comment">
      <span class="iconfont icon-jinggao1"></span>
      当前{{ type == '1' ? '文章' : '资源' }}关闭了评论权限
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, watch } from 'vue'
import ElMessage from '../../utils/resetMessage'
import { storeToRefs } from 'pinia'
import { useMainStore } from "../../store";
import commentList from './comment-list.vue'
import { queryCommentList, addComment } from '../../apis/comment'
import { DataAnalysis } from '@element-plus/icons-vue/dist/types';
const mainStore = useMainStore();
const { userInfo } = storeToRefs(mainStore)

const props = defineProps({
  // 是否允许评论
  can: {
    type: String,
    default: '1'
  },
  // 对什么评论
  type: {
    type: String,
    default: ''
  },
  // 被评论者id
  targetId: {
    type: String,
    default: ''
  },
  // 被评论者name
  targetName: {
    type: String,
    default: ''
  },
  // 评论人信息
  fromData: {
    type: Object,
    default: {}
  },
})
const textarea = ref('')
let data = ref([])
let more = ref(false)
const userInfoData = ref()
// 数据处理
const getNeedData = (data) => {
  data.forEach(item => {
    if (item.children && item.children.length) {
      getNeedData(item.children)
      data.push(...item.children)
    }
  });
}
let pageSize = ref(5)
let total = ref()
// 获取留言数据
const getCommentList = async () => {
  await queryCommentList({
    pageNo:1,
    pageSize:pageSize.value,
    page_id: props.targetId,
    type: props.type
  }).then((res: any) => {
    if (res.code == 200) {
      let commentData = res.data.data
      if(pageSize.value < res.data.total) {
        more.value = true
      }else {
         more.value =false
      }
      total.value = res.data.total 
      commentData.forEach(item => {
        // 文章的(每条评论item)下的（用户对用户）回复
        // item.children 用户对用户的回复 ---->   还会有children -----> children
        if (item.children && item.children.length) {
          // 如果有用户对用户的回复,不管多少层,都拍平放到item.children中去

          getNeedData(item.children)
        }
      });
      data.value = commentData
    } else {
      data.value = []
    }


  })
}
// 查看更多留言
const getMoreComments = ()=> {
  pageSize.value = total.value
  getCommentList()
}
// 收起更多
const getLessComments= ()=> {
  pageSize.value = 5
  getCommentList()
}
// 新增评论
const addCommentBtn = () => {
  if (props.can != '1') {
    ElMessage({
      message: '当前' + (props.type == '1' ? '文章' : '页面') + '关闭了评论权限',
      type: 'warning',
    })
    return
  }
  if (!userInfoData.value) {
    ElMessage({
      message: '请登录后评论',
      type: 'warning',
    })
    return
  } else {

    let params = {
      type: props.type,
      pid: '0',
      page_id: props.targetId,
      target_id: props.targetId,
      target_name: props.targetName,
      from_id: userInfoData.value.id,
      from_name: userInfoData.value.username,
      from_avatar: userInfoData.value.avator,
      from_area: userInfoData.value.city,
      content: textarea.value,
    }
    if (!textarea.value) {
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
        } else {
          ElMessage({
            message: res.msg,
            type: 'warning',
          })
        }
        textarea.value = ''
        getCommentList()
      })
    }
  }

}
watch(() => userInfo.value, (newval) => {
  userInfoData.value = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
})
onMounted(() => {
  userInfoData.value = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
  getCommentList()

})
</script>

<style lang='scss' scoped>
.comment-box {
  margin-bottom: 20px;

  .top-txt {
    padding: 15px 0px;
    text-align: center;
    font-size: 19px;
    font-weight: 600;
    color: #4c9b7d;
  }

  .ipt-bottom {
    margin-top: 12px;
    display: flex;
    justify-content: right;
  }
}
</style>
<style lang='scss' >
.comment-ipt {

  .el-textarea__inner,
  .el-input__inner {
    // background: url(https://static.talkxj.com/config/commentBack.webp)
    background: url(https://blog-1303885568.cos.ap-chengdu.myqcloud.com/useImg/comment.png) right bottom no-repeat;
  }
}

.close-comment {
  font-size: 16px;
  font-weight: 500;
}
</style>