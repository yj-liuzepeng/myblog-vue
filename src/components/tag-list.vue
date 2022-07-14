<template>
  <div class="taglist-box cssnice4">
    <div class="taglist-box-title" :style="{ color: authorstyle.namecolor }">
      标签云
      <span class="iconfont icon-24gf-tags3"></span>
    </div>
    <div class="taglist-box-content">
      <div class="tag-list">
        <el-tag
          class="tag-item"
          @click="hClickTag(item)"
          v-for="item  in tagList"
          :style="[{ 'background-color': item.color }, { 'color': '#fff' }]"
        >{{ item.name }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useMainStore } from "../store";
import { queryTagList } from '../apis/article'

const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore)
const emit = defineEmits(['click-tag'])
let tagList = ref([
  {
    color: "rgba(19, 206, 102, 0.8)",
    id: '001',
    name: "全部",
  }
])
const getTagList = () => {
  let params = {
    pageSize: 999,
    pageNo: 1
  }
  queryTagList(params).then((res: any) => {
    if (res.code === 200) {
      tagList.value.push(...res.data.data)
    }
  })
}
const hClickTag = (item) => {
  emit('click-tag', item)

}
onMounted(() => {
  getTagList()
})
</script>

<style lang='scss' scoped>
.taglist-box {
  padding: 15px;
  .taglist-box-title {
    padding-bottom: 5px;
    font-size: 16px;
    border-radius: 4px;
    border-bottom: 1px solid #dcdfe6;
  }
  .taglist-box-content {
    padding-top: 10px;
    .tag-item {
      margin-right: 8px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
}
</style>