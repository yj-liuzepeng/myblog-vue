<template>
  <div class="about">
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="left-content">
          <div class="kb-img">
            <img src="../assets/kb.png" alt="kb" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-content">
          <Author />

          <your-info />
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
.about {
  padding-top: 3.2rem;
  .left-content {
    border: 1px solid rgb(242, 235, 235);
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    margin-right: 10px;

    .kb-img {
      width: 100%;
      height: 240px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right-content {
    width: 100%;
  }
}
</style>