<!--
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: file content
-->
<template>
  <div class="record">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="18" >
        <div class="left-content cssnice1">
          <div class="timeline-box">
            <a-timeline mode="alternate">
              <a-timeline-item v-for="item in timelineList">
                <template #dot>
                  <span
                    :class="['iconfont', item.icon]"
                    :style="[{ 'fontSize': '16px' }, { 'color': item.color }]"
                  ></span>
                </template>
                <div>
                  <div v-if="item.title && item.title!='无'" class="timeline-title">{{ item.title }}</div>
                  <div class="timeline-des" :style="{ 'color': item.color }">{{ item.description }}</div>
                  <!-- <img v-if="item.pic" style="width:80%;margin-top: 10px;" :src="'https://liuzepeng.com/' + item.pic" :alt="item.title" /> -->
                  <img v-if="item.pic" style="width:80%;margin-top: 10px;" v-lazy="'https://liuzepeng.com/' + item.pic"   :alt="item.title" />

                  <div class="timeline-time">{{ UnixToDate(new Date(item.dotime), 6) }}</div>
                  <el-divider border-style="dashed" />
                </div>
              </a-timeline-item>
            </a-timeline>
          </div>
        </div>
      </el-col>
       <el-col :xs="0" :sm="6">
        <div class="right-content cssnice2">
          <Author />
          <your-info />
          <hot-articles/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import Author from '../components/author.vue'
import yourInfo from '../components/your-info.vue'
import hotArticles from '../components/hot-articles.vue'
import { queryTimelineList } from '../apis/timeline'
import { UnixToDate } from '../utils/datetime'
import { goTop } from '../utils/pageEffect'
let timelineList = ref([])
const getTimeline = () => {
  queryTimelineList({ pageSize: 9999, pageNo: 1 }).then((res: any) => {

    if (res.code == 200) {
      timelineList.value =  res.data.data.reverse() // 翻转新增的在下面
    }
  })
}
onMounted(() => {
  getTimeline()
  goTop()
})
</script>

<style lang='scss' scoped>
.record {
  padding-top: 3.2rem;
  .timeline-box {
    margin-top: 25px;
    .timeline-title {
      font-size: 1.5rem;
      color: coral;
    }
    .timeline-title {
      margin-top: 15px;
    }
    .timeline-time {
      margin-top: 15px;
      color: #6ca189;
    }
  }
}
.el-divider--horizontal {
  margin: 0;
}
</style>
<style>
.el-timeline-item__timestamp.is-bottom {
  position: absolute;
  left: -147px;
  top: -3px;
  color: #333333;
}
.el-timeline {
  padding-left: 300px;
}
</style>
<style>
.ant-timeline.ant-timeline-alternate .ant-timeline-item-head-custom,
.ant-timeline.ant-timeline-right .ant-timeline-item-head-custom {
  background: transparent !important;
}
</style>