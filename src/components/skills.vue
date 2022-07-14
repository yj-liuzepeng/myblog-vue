<template>
  <div class="skill-box cssnice4">
    <div class="skill-box-title" :style="{ color: authorstyle.namecolor }">
      博主Skills
      <span class="iconfont icon-zhiyejinengjianding"></span>
    </div>
    <div class="skill-box-content">
      <div class="skill-item">
        <span class="skill-name">HTML5</span>
        <el-progress :percentage="60" :indeterminate="true" color="#cf7073" />
      </div>
      <div class="skill-item">
        <span class="skill-name">CSS3</span>
        <el-progress :percentage="40" :indeterminate="true" />
      </div>
      <div class="skill-item">
        <span class="skill-name">JavaScript</span>
        <el-progress :percentage="60" :indeterminate="true" color="#daabea" />
      </div>
      <div class="skill-item">
        <span class="skill-name">Vue.js</span>
        <el-progress :percentage="60" :indeterminate="true" color="#dbfbdf" />
      </div>
      <div class="skill-item">
        <span class="skill-name">React.js</span>
        <el-progress :percentage="30" :indeterminate="true" color="#f4c04e" />
      </div>
      <div class="skill-item">
        <span class="skill-name">Node.js</span>
        <el-progress :percentage="30" :indeterminate="true" color="#957b47" />
      </div>
      <div class="skill-item">
        <span class="skill-name">MySql</span>
        <el-progress :percentage="20" :indeterminate="true" color="#f7ce46" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useMainStore } from "../store";
// import { queryTagList } from '../apis/article'

const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore)
const emit = defineEmits(['click-tag'])

</script>

<style lang='scss' scoped>
.skill-box {
  padding: 15px;

  .skill-box-title {
    padding-bottom: 5px;
    font-size: 16px;
    border-radius: 4px;
    border-bottom: 1px solid #dcdfe6;
  }

  .skill-box-content {
    padding-top: 10px;

    .skill-item {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      margin-top: 15px;

      .skill-name {
        color: rgb(32, 157, 123);
      }
    }
  }
}
</style>
<style>
.el-progress-bar {
  width: 100px !important;
}
</style>