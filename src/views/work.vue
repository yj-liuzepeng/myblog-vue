<template>
  <div class="work">
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="left-content">
          <div class="left-content-header">
                <el-row>
              <el-col :span="18">
                个人实战
                <span class="color-danger">{{0}}</span> 篇
              </el-col>
              <el-col :span="6">
                <el-input class="w-50 m-2" v-model="searchIpt" :suffix-icon="Search" placeholder="搜索实战内容" />
                <!-- <template #suffix>
                  <el-icon class="el-input__icon">
                    <search />
                  </el-icon>
                </template> -->
              </el-col>
            </el-row>
          </div>
          <div class="left-content-items"></div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-content">
          <Author />
          <your-info />
          <!-- <tag-list /> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import Author from '../components/author.vue'
import yourInfo from '../components/your-info.vue'
import tagList from '../components/tag-list.vue'
let searchIpt = ref('')
</script>

<style lang='scss' scoped>
.work {
  padding-top: 3.2rem;
}
.right-content {
  width: 100%;
}
</style>