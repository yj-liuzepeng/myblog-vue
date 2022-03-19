<template>
  <div class="skill-box">
    <div class="skill-box-title" :style="{ color: authorstyle.namecolor }">
      博主Skills
      <span class="iconfont icon-zhuanyezhishijineng"></span>
    </div>
    <div class="skill-box-content">
     
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
  
  }
}
</style>