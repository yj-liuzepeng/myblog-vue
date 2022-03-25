<!--
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: file content
-->
<template>
  <div class="yourinfo-box">
    <div class="yourinfo-box-title" :style="{ color: authorstyle.namecolor }">
      相见恨晚
      <span class="iconfont icon-keaide"></span>
    </div>
    <div class="yourinfo-box-content">
      <div>
        您的ip:
        <span :style="{ color: authorstyle.namecolor }">{{ yourInfo.ip }}</span>
      </div>

      <div>
        您的地址:
        <span :style="{ color: authorstyle.namecolor }">{{ yourInfo.city }}</span>
      </div>
      <div>
        您的浏览器:
        <span :style="{ color: authorstyle.namecolor }">{{ yourInfo.browser }}</span>
      </div>
      <div>
        您好，您在:
        <span :style="{ color: authorstyle.namecolor }">
          {{ yourInfo.time }}登录本站。
          {{ yourInfo.tip }}
         
        </span>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useMainStore } from "../store";
import { getBrowserInfo } from '../utils/visitor'
import { UnixToDate } from '../utils/datetime'
const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore)

const yourInfo = reactive({
  ip: returnCitySN["cip"],
  city: returnCitySN["cname"],
  browser: getBrowserInfo(),
  time: UnixToDate(new Date(), 2),
  tip: ''
})
const hHours = () => {
  let now = new Date()
  let hour = now.getHours()
  if(hour <= 6)  return '太早了!不再多睡会了嘛～～'
  if(hour <= 9)  return '早上好啊！新的一天，元气满满，加油！！！'
  if(hour <= 12) return  '上午好！好好工作，理性摸鱼，加油少年～～'
  if(hour <= 14) return  '吃饱了吗，要不要午睡一会儿～～'
  if(hour <= 17) return  '下午好啊，坐太久了，起来活动活动吧～～'
  if(hour <= 19) return  '下班时间到，回家路上注意安全'
  if(hour <= 22) return  '晚上好卷王，来吧我们一起卷，哈哈～～'
}
onMounted(() => {
  yourInfo.tip = hHours()
})

</script>

<style lang='scss' scoped>
.yourinfo-box {
  padding: 15px;
  .yourinfo-box-title {
    padding-bottom: 5px;
    font-size: 16px;
    border-radius: 4px;
    border-bottom: 1px solid #dcdfe6;
    // border-bottom: 1px solid v-bind('authorstyle.namecolor');
  }
  .yourinfo-box-content {
    font-size: 14px;
    font-family: 楷体;
    color: rgb(133, 133, 133);
    padding-top: 10px;
  }
}
</style>