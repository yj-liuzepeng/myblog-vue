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
        <span :style="{ color: authorstyle.namecolor }">{{
          yourInfo.city
        }}</span>
      </div>
      <div>
        您的浏览器:
        <span :style="{ color: authorstyle.namecolor }">{{
          yourInfo.browser.type
        }}</span>
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

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../store";
import { getBrowser } from "../utils/getInfo";
import { UnixToDate } from "../utils/datetime";
const mainStore = useMainStore();
const { authorstyle, position } = storeToRefs(mainStore);
const yourInfo = reactive({
  ip: position.value.ip,
  city: position.value.city,
  browser: getBrowser(),
  time: UnixToDate(new Date(), 2),
  tip: "",
});
const hHours = () => {
  let now = new Date();
  let hour = now.getHours();
  if (hour <= 3) return "太晚了，快点睡觉去，做个好梦～～";
  if (hour <= 6) return "太早了!不再多睡会了嘛～～";
  if (hour <= 9) return "早上好啊！新的一天，元气满满，加油！！！";
  if (hour <= 12) return "上午好！好好工作，理性摸鱼，加油呀～～";
  if (hour <= 13) return "吃饱了吗，要不要午睡一会儿～～";
  if (hour <= 15) return "下午好呀，午休过后，开始工作啦～～";
  if (hour <= 17) return "是不是坐太久了，起来活动活动吧～～";
  if (hour <= 19) return "下班时间到，回家路上要注意安全呀";
  if (hour <= 22) return "晚上好，下班回家，做些运动或者看会电视，放松一下吧";
  if (hour <= 24) return "太晚了，早点休息哦，身体重要！！！";
};
onMounted(() => {
  yourInfo.tip = hHours();
});
</script>

<style lang="scss" scoped>
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
