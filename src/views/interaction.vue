<!--
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: file content
-->
<template>
   <div class="interaction">
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="left-content">
         
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-content cssnice2">
          <Author />
          <your-info />
          <Skills></Skills>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
  import { } from 'vue';
  import Author from '../components/author.vue'
import yourInfo from '../components/your-info.vue'
</script>

<style lang='scss' scoped>
.interaction {
    padding-top: 3.2rem;
      .left-content {
    border: 1px solid rgb(242, 235, 235);
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    margin-right: 10px;
      }
      .right-content {
    width: 100%;
  }
}
</style>