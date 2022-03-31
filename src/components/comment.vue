<!--
 * @Author: lzp
 * @Date: 2022-03-30 11:44:41
 * @Description: 评论组件
-->
<template>
  <div class="comment-box">
    <div class="top-txt"  >可以在这里发表您的看法或者建议(支持markdown语法)</div>
    <!-- <div class="top-txt" :style="{ color: authorstyle.namecolor }" >可以在这里发表您的看法或者建议(支持markdown语法)</div> -->
    <el-input v-model="textarea" placeholder="请输入内容" show-word-limit type="textarea" rows="5" />
    <div class="ipt-bottom">
      <el-button type="primary">提交评论</el-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from "../store";
const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore)
const textarea = ref('')

</script>

<style lang='scss' scoped>
.comment-box {
  margin-bottom: 20px;
  .top-txt {
    padding: 5px 0px;
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
<style>
.el-textarea__inner,
.el-input__inner {
  /* background: url(https://blog-1303885568.cos.ap-chengdu.myqcloud.com/useImg/comment.png)
    right bottom no-repeat; */
}
</style>